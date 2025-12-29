import {
  RestApiServiceCall,
  HeaderEntry,
  ParameterEntry,
  RestApiValueMapping,
} from "@/models/product/rest-api-types";
import {
  ResponseQuery,
  ValueMapping,
  JMESPathMapping,
  JMESPathMappingRecord,
} from "@/models/generic";
import { wrapInArray, setOptionalXmlField, setOptionalXmlArray } from "@/utils/builder-utils";
import { validateRestApiServiceCall } from "./rest-api-service-call-schema";

/**
 * Builds XML object for headerEntry from HeaderEntry model
 */
function buildHeaderEntry(headerEntry: HeaderEntry): Record<string, unknown> {
  return {
    headerName: wrapInArray(headerEntry.headerName),
    value: wrapInArray(headerEntry.value),
  };
}

/**
 * Builds XML object for headerList from HeaderList model
 */
function buildHeaderList(
  headerList: { header?: HeaderEntry[] } | undefined
): Record<string, unknown> | undefined {
  if (!headerList || !headerList.header || headerList.header.length === 0) {
    return undefined;
  }

  return {
    header: headerList.header.map(buildHeaderEntry),
  };
}

/**
 * Builds XML object for parameterEntry from ParameterEntry model
 */
function buildParameterEntry(parameterEntry: ParameterEntry): Record<string, unknown> {
  return {
    name: wrapInArray(parameterEntry.name),
    value: wrapInArray(parameterEntry.value),
  };
}

/**
 * Builds XML object for parameterList from ParameterList model
 */
function buildParameterList(
  parameterList: { parameter: ParameterEntry[] } | undefined
): Record<string, unknown> | undefined {
  if (!parameterList || !parameterList.parameter || parameterList.parameter.length === 0) {
    return undefined;
  }

  return {
    parameter: parameterList.parameter.map(buildParameterEntry),
  };
}

/**
 * Builds XML object for jmesPathMappingRecord from JMESPathMappingRecord model
 */
function buildJmesPathMappingRecord(record: JMESPathMappingRecord): Record<string, unknown> {
  const recordXml: Record<string, unknown> = {
    from: wrapInArray(record.from),
    to: wrapInArray(record.to),
  };
  setOptionalXmlField(recordXml, "name", record.name);
  return recordXml;
}

/**
 * Builds XML object for jmesPathMapping from JMESPathMapping model
 */
function buildJmesPathMapping(jmesPathMapping: JMESPathMapping): Record<string, unknown> {
  return {
    mapping: jmesPathMapping.mapping.map(buildJmesPathMappingRecord),
  };
}

/**
 * Builds XML object for responseQuery from ResponseQuery model
 */
function buildResponseQuery(
  responseQuery: ResponseQuery | undefined
): Record<string, unknown> | undefined {
  if (!responseQuery) {
    return undefined;
  }

  const responseQueryXml: Record<string, unknown> = {
    queryType: wrapInArray(responseQuery.queryType),
  };

  // Add query field if present
  if ("query" in responseQuery && responseQuery.query) {
    responseQueryXml.query = wrapInArray(responseQuery.query);
  }

  // Add jmesPathMappings if present
  if ("jmesPathMappings" in responseQuery && responseQuery.jmesPathMappings) {
    responseQueryXml.jmesPathMappings = wrapInArray(
      buildJmesPathMapping(responseQuery.jmesPathMappings)
    );
  }

  return responseQueryXml;
}

/**
 * Builds XML object for valueMapping from ValueMapping model
 */
function buildValueMapping(valueMapping: ValueMapping): Record<string, unknown> {
  return {
    genericValue: wrapInArray(valueMapping.genericValue),
    deviceValue: wrapInArray(valueMapping.deviceValue),
  };
}

/**
 * Builds XML object for restApiValueMapping from RestApiValueMapping model
 */
function buildRestApiValueMapping(
  valueMapping: RestApiValueMapping | undefined
): Record<string, unknown> | undefined {
  if (!valueMapping || !valueMapping.mapping || valueMapping.mapping.length === 0) {
    return undefined;
  }

  return {
    mapping: valueMapping.mapping.map(buildValueMapping),
  };
}

/**
 * Builds XML object for restApiServiceCall from RestApiServiceCall model
 * @throws Error if required fields are missing
 */
export function buildRestApiServiceCall(
  serviceCall: RestApiServiceCall | undefined
): Record<string, unknown> | undefined {
  if (!serviceCall) {
    return undefined;
  }

  // Validate using validation layer
  const validation = validateRestApiServiceCall(serviceCall);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for REST API service call";
    throw new Error(errorMessage);
  }

  const serviceCallXml: Record<string, unknown> = {};

  // Include optional requestHeader (must come before requestMethod)
  if (serviceCall.requestHeader) {
    const headerListXml = buildHeaderList(serviceCall.requestHeader);
    if (headerListXml) {
      serviceCallXml.requestHeader = wrapInArray(headerListXml);
    }
  }

  // Include required requestMethod
  serviceCallXml.requestMethod = wrapInArray(serviceCall.requestMethod);

  // Include optional requestPath
  setOptionalXmlField(serviceCallXml, "requestPath", serviceCall.requestPath);

  // Include optional requestQuery
  if (serviceCall.requestQuery) {
    const queryXml = buildParameterList(serviceCall.requestQuery);
    if (queryXml) {
      serviceCallXml.requestQuery = wrapInArray(queryXml);
    }
  }

  // Include optional requestForm
  if (serviceCall.requestForm) {
    const formXml = buildParameterList(serviceCall.requestForm);
    if (formXml) {
      serviceCallXml.requestForm = wrapInArray(formXml);
    }
  }

  // Include optional requestBody
  setOptionalXmlField(serviceCallXml, "requestBody", serviceCall.requestBody);

  // Include optional responseQuery
  if (serviceCall.responseQuery) {
    const responseQueryXml = buildResponseQuery(serviceCall.responseQuery);
    if (responseQueryXml) {
      serviceCallXml.responseQuery = wrapInArray(responseQueryXml);
    }
  }

  // Include optional valueMapping
  if (serviceCall.valueMapping) {
    const valueMappingXml = buildRestApiValueMapping(serviceCall.valueMapping);
    if (valueMappingXml) {
      serviceCallXml.valueMapping = wrapInArray(valueMappingXml);
    }
  }

  return serviceCallXml;
}
