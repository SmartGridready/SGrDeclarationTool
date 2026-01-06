import { RestApiDataPointConfiguration, RestApiServiceCall } from "@/models/product/rest-api-types";
import { wrapInArray } from "@/utils/builder-utils";
import { buildRestApiServiceCall } from "@/sections/shared/rest-api-service-call/rest-api-service-call-builder";
import { validateRestApiDataPointConfiguration } from "./rest-api-data-point-configuration-schema";

/**
 * Type guards for configuration types
 */
function isSingleServiceCallConfig(config: RestApiDataPointConfiguration): config is RestApiDataPointConfiguration & {
  restApiServiceCall: RestApiServiceCall;
} {
  return "restApiServiceCall" in config && config.restApiServiceCall !== undefined;
}

function isWriteReadServiceCallConfig(
  config: RestApiDataPointConfiguration
): config is RestApiDataPointConfiguration & {
  restApiWriteServiceCall: RestApiServiceCall;
} {
  // Write-Read: restApiWriteServiceCall is required, restApiReadServiceCall is optional
  // If both exist, we need to check which is primary based on object key order
  const hasWrite = "restApiWriteServiceCall" in config && config.restApiWriteServiceCall !== undefined;
  const hasRead = "restApiReadServiceCall" in config && config.restApiReadServiceCall !== undefined;

  if (!hasWrite) return false;

  // If both exist, check which comes first in object keys to determine primary
  if (hasWrite && hasRead) {
    const keys = Object.keys(config);
    const writeIndex = keys.indexOf("restApiWriteServiceCall");
    const readIndex = keys.indexOf("restApiReadServiceCall");
    // Write is primary if it comes first
    return writeIndex !== -1 && readIndex !== -1 && writeIndex < readIndex;
  }

  // Only write exists: Write-Read configuration
  return true;
}

function isReadWriteServiceCallConfig(
  config: RestApiDataPointConfiguration
): config is RestApiDataPointConfiguration & {
  restApiReadServiceCall: RestApiServiceCall;
} {
  // Read-Write: restApiReadServiceCall is required, restApiWriteServiceCall is optional
  // If both exist, we need to check which is primary based on object key order
  const hasWrite = "restApiWriteServiceCall" in config && config.restApiWriteServiceCall !== undefined;
  const hasRead = "restApiReadServiceCall" in config && config.restApiReadServiceCall !== undefined;

  if (!hasRead) return false;

  // If both exist, check which comes first in object keys to determine primary
  if (hasWrite && hasRead) {
    const keys = Object.keys(config);
    const writeIndex = keys.indexOf("restApiWriteServiceCall");
    const readIndex = keys.indexOf("restApiReadServiceCall");
    // Read is primary if it comes first
    return writeIndex !== -1 && readIndex !== -1 && readIndex < writeIndex;
  }

  // Only read exists: Read-Write configuration
  return true;
}

/**
 * Builds XML object for restApiDataPointConfiguration from RestApiDataPointConfiguration model
 * @throws Error if required fields are missing
 */
export function buildRestApiDataPointConfiguration(
  configuration: RestApiDataPointConfiguration | undefined
): Record<string, unknown> | undefined {
  if (!configuration) {
    return undefined;
  }

  // Validate using validation layer
  const validation = validateRestApiDataPointConfiguration(configuration);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for REST API data point configuration";
    throw new Error(errorMessage);
  }

  const configurationXml: Record<string, unknown> = {
    dataType: wrapInArray(configuration.dataType),
  };

  // Build single service call configuration
  if (isSingleServiceCallConfig(configuration)) {
    const serviceCallXml = buildRestApiServiceCall(configuration.restApiServiceCall);
    if (serviceCallXml) {
      configurationXml.restApiServiceCall = wrapInArray(serviceCallXml);
    }
    return configurationXml;
  }

  // Build write-read service call configuration
  if (isWriteReadServiceCallConfig(configuration)) {
    const writeServiceCallXml = buildRestApiServiceCall(configuration.restApiWriteServiceCall);
    if (writeServiceCallXml) {
      configurationXml.restApiWriteServiceCall = wrapInArray(writeServiceCallXml);
    }

    // Include optional read service call
    if ("restApiReadServiceCall" in configuration && configuration.restApiReadServiceCall) {
      const readServiceCallXml = buildRestApiServiceCall(configuration.restApiReadServiceCall);
      if (readServiceCallXml) {
        configurationXml.restApiReadServiceCall = wrapInArray(readServiceCallXml);
      }
    }
    return configurationXml;
  }

  // Build read-write service call configuration
  if (isReadWriteServiceCallConfig(configuration)) {
    const readServiceCallXml = buildRestApiServiceCall(configuration.restApiReadServiceCall);
    if (readServiceCallXml) {
      configurationXml.restApiReadServiceCall = wrapInArray(readServiceCallXml);
    }

    // Include optional write service call
    if ("restApiWriteServiceCall" in configuration && configuration.restApiWriteServiceCall) {
      const writeServiceCallXml = buildRestApiServiceCall(configuration.restApiWriteServiceCall);
      if (writeServiceCallXml) {
        configurationXml.restApiWriteServiceCall = wrapInArray(writeServiceCallXml);
      }
    }
    return configurationXml;
  }

  return configurationXml;
}
