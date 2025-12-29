import { RestApiDataPointConfiguration, RestApiDataType } from "@/models/product/rest-api-types";
import {
  getTypedValue,
  getFirstElement,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";
import { mapRestApiServiceCall } from "@/sections/shared/rest-api-service-call/rest-api-service-call-mapper";

/**
 * Maps XML restApiDataPointConfiguration to RestApiDataPointConfiguration model
 */
export function mapRestApiDataPointConfiguration(
  configurationXml: Xml2JsObject | undefined
): RestApiDataPointConfiguration | undefined {
  if (!configurationXml) {
    return undefined;
  }

  const dataType = getTypedValue<RestApiDataType>(configurationXml, "dataType", "JSON_string");

  // Check for single service call configuration
  const restApiServiceCallXml = getFirstElement(configurationXml, "restApiServiceCall");
  if (restApiServiceCallXml) {
    const restApiServiceCall = mapRestApiServiceCall(restApiServiceCallXml);
    if (restApiServiceCall) {
      return {
        dataType,
        restApiServiceCall,
      };
    }
  }

  // Check for write/read service call configuration
  const restApiWriteServiceCallXml = getFirstElement(configurationXml, "restApiWriteServiceCall");
  const restApiReadServiceCallXml = getFirstElement(configurationXml, "restApiReadServiceCall");

  // Write-Read configuration (write is primary/required)
  if (restApiWriteServiceCallXml) {
    const restApiWriteServiceCall = mapRestApiServiceCall(restApiWriteServiceCallXml);
    if (restApiWriteServiceCall) {
      const config: RestApiDataPointConfiguration = {
        dataType,
        restApiWriteServiceCall,
      };

      // Add optional read service call
      if (restApiReadServiceCallXml) {
        const restApiReadServiceCall = mapRestApiServiceCall(restApiReadServiceCallXml);
        setOptionalField(config, "restApiReadServiceCall", restApiReadServiceCall);
      }

      return config;
    }
  }

  // Read-Write configuration (read is primary/required)
  if (restApiReadServiceCallXml) {
    const restApiReadServiceCall = mapRestApiServiceCall(restApiReadServiceCallXml);
    if (restApiReadServiceCall) {
      const config: RestApiDataPointConfiguration = {
        dataType,
        restApiReadServiceCall,
      };

      // Write was already checked above, so if we're here, there's no write call
      return config;
    }
  }

  // No valid configuration found
  return undefined;
}
