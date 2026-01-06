import { RestApiDataPointConfiguration, RestApiDataType } from "@/models/product/rest-api-types";
import { getTypedValue, getFirstElement, setOptionalField, Xml2JsObject } from "@/utils/mapper-utils";
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

  // Determine which comes first in XML to determine the primary configuration type
  // This is important: Write-Read means write is primary, Read-Write means read is primary
  // If both exist, the one that comes first in Object.keys determines the primary type
  // (Modern JavaScript engines preserve insertion order for object keys, which matches XML order)
  const keys = Object.keys(configurationXml);
  const writeKeyIndex = keys.indexOf("restApiWriteServiceCall");
  const readKeyIndex = keys.indexOf("restApiReadServiceCall");

  const hasWrite = writeKeyIndex !== -1 && restApiWriteServiceCallXml !== undefined;
  const hasRead = readKeyIndex !== -1 && restApiReadServiceCallXml !== undefined;
  const bothExist = hasWrite && hasRead;

  // Determine primary type based on order when both exist, or which one exists
  let isWriteRead = false;
  let isReadWrite = false;

  if (bothExist) {
    // Both exist: the one that comes first in keys determines primary type
    isWriteRead = writeKeyIndex < readKeyIndex;
    isReadWrite = readKeyIndex < writeKeyIndex;
  } else if (hasWrite) {
    // Only write exists: Write-Read configuration
    isWriteRead = true;
  } else if (hasRead) {
    // Only read exists: Read-Write configuration
    isReadWrite = true;
  }

  // Write-Read configuration (write is primary/required)
  if (isWriteRead) {
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
  if (isReadWrite) {
    const restApiReadServiceCall = mapRestApiServiceCall(restApiReadServiceCallXml);
    if (restApiReadServiceCall) {
      const config: RestApiDataPointConfiguration = {
        dataType,
        restApiReadServiceCall,
      };

      // Add optional write service call
      if (restApiWriteServiceCallXml) {
        const restApiWriteServiceCall = mapRestApiServiceCall(restApiWriteServiceCallXml);
        setOptionalField(config, "restApiWriteServiceCall", restApiWriteServiceCall);
      }

      return config;
    }
  }

  // No valid configuration found
  return undefined;
}
