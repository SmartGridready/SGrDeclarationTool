import {
  RestApiServiceCall,
  HeaderList,
  HeaderEntry,
  ParameterList,
  ParameterEntry,
  HttpMethod,
  RestApiValueMapping,
} from "@/models/product/rest-api-types";
import { ResponseQuery, ValueMapping, JMESPathMapping, JMESPathMappingRecord } from "@/models/generic";
import {
  getStringValue,
  getOptionalStringValue,
  getOptionalTypedValue,
  getFirstElement,
  setOptionalField,
  mapArray,
  Xml2JsObject,
} from "@/utils/mapper-utils";

/**
 * Maps XML headerEntry to HeaderEntry model
 */
function mapHeaderEntry(headerEntryXml: Xml2JsObject): HeaderEntry {
  return {
    headerName: getStringValue(headerEntryXml, "headerName"),
    value: getStringValue(headerEntryXml, "value"),
  };
}

/**
 * Maps XML headerList to HeaderList model
 */
function mapHeaderList(headerListXml: Xml2JsObject | undefined): HeaderList | undefined {
  if (!headerListXml) {
    return undefined;
  }

  const headerList: HeaderList = {};
  const headers = mapArray(headerListXml, "header", mapHeaderEntry);
  if (headers.length > 0) {
    headerList.header = headers;
  }

  return Object.keys(headerList).length > 0 ? headerList : undefined;
}

/**
 * Maps XML parameterEntry to ParameterEntry model
 */
function mapParameterEntry(parameterEntryXml: Xml2JsObject): ParameterEntry {
  return {
    name: getStringValue(parameterEntryXml, "name"),
    value: getStringValue(parameterEntryXml, "value"),
  };
}

/**
 * Maps XML parameterList to ParameterList model
 */
function mapParameterList(parameterListXml: Xml2JsObject | undefined): ParameterList | undefined {
  if (!parameterListXml) {
    return undefined;
  }

  const parameters = mapArray(parameterListXml, "parameter", mapParameterEntry);
  if (parameters.length === 0) {
    return undefined;
  }

  return { parameter: parameters };
}

/**
 * Maps XML jmesPathMappingRecord to JMESPathMappingRecord model
 */
function mapJmesPathMappingRecord(recordXml: Xml2JsObject): JMESPathMappingRecord {
  const record: JMESPathMappingRecord = {
    from: getStringValue(recordXml, "from"),
    to: getStringValue(recordXml, "to"),
  };
  setOptionalField(record, "name", getOptionalStringValue(recordXml, "name"));
  return record;
}

/**
 * Maps XML jmesPathMapping to JMESPathMapping model
 */
function mapJmesPathMapping(jmesPathMappingXml: Xml2JsObject): JMESPathMapping {
  const mapping: JMESPathMapping = {
    mapping: mapArray(jmesPathMappingXml, "mapping", mapJmesPathMappingRecord),
  };
  return mapping;
}

/**
 * Maps XML responseQuery to ResponseQuery model
 */
function mapResponseQuery(responseQueryXml: Xml2JsObject | undefined): ResponseQuery | undefined {
  if (!responseQueryXml) {
    return undefined;
  }

  const queryType = getOptionalTypedValue<ResponseQuery["queryType"]>(responseQueryXml, "queryType");
  if (!queryType) {
    return undefined;
  }

  const baseResponseQuery: ResponseQuery = { queryType };

  // Check if it has a query field
  const query = getOptionalStringValue(responseQueryXml, "query");
  if (query !== undefined) {
    return { ...baseResponseQuery, query };
  }

  // Check if it has jmesPathMappings
  const jmesPathMappingsXml = getFirstElement(responseQueryXml, "jmesPathMappings");
  if (jmesPathMappingsXml) {
    return {
      ...baseResponseQuery,
      jmesPathMappings: mapJmesPathMapping(jmesPathMappingsXml),
    };
  }

  return baseResponseQuery;
}

/**
 * Maps XML valueMapping to ValueMapping model
 */
function mapValueMapping(valueMappingXml: Xml2JsObject): ValueMapping {
  return {
    genericValue: getStringValue(valueMappingXml, "genericValue"),
    deviceValue: getStringValue(valueMappingXml, "deviceValue"),
  };
}

/**
 * Maps XML restApiValueMapping to RestApiValueMapping model
 */
function mapRestApiValueMapping(valueMappingXml: Xml2JsObject | undefined): RestApiValueMapping | undefined {
  if (!valueMappingXml) {
    return undefined;
  }

  const mappings = mapArray(valueMappingXml, "mapping", mapValueMapping);
  if (mappings.length === 0) {
    return undefined;
  }

  return { mapping: mappings };
}

/**
 * Maps XML restApiServiceCall to RestApiServiceCall model
 */
export function mapRestApiServiceCall(serviceCallXml: Xml2JsObject | undefined): RestApiServiceCall | undefined {
  if (!serviceCallXml) {
    return undefined;
  }

  // requestMethod is required
  const requestMethod = getOptionalTypedValue<HttpMethod>(serviceCallXml, "requestMethod");
  if (!requestMethod) {
    return undefined;
  }

  const serviceCall: RestApiServiceCall = {
    requestMethod,
  };

  // Map optional requestHeader (must come before requestMethod in XML)
  const requestHeaderXml = getFirstElement(serviceCallXml, "requestHeader");
  setOptionalField(serviceCall, "requestHeader", mapHeaderList(requestHeaderXml));

  // Map optional requestPath
  setOptionalField(serviceCall, "requestPath", getOptionalStringValue(serviceCallXml, "requestPath"));

  // Map optional requestQuery
  const requestQueryXml = getFirstElement(serviceCallXml, "requestQuery");
  setOptionalField(serviceCall, "requestQuery", mapParameterList(requestQueryXml));

  // Map optional requestForm
  const requestFormXml = getFirstElement(serviceCallXml, "requestForm");
  setOptionalField(serviceCall, "requestForm", mapParameterList(requestFormXml));

  // Map optional requestBody
  setOptionalField(serviceCall, "requestBody", getOptionalStringValue(serviceCallXml, "requestBody"));

  // Map optional responseQuery
  const responseQueryXml = getFirstElement(serviceCallXml, "responseQuery");
  setOptionalField(serviceCall, "responseQuery", mapResponseQuery(responseQueryXml));

  // Map optional valueMapping
  const valueMappingXml = getFirstElement(serviceCallXml, "valueMapping");
  setOptionalField(serviceCall, "valueMapping", mapRestApiValueMapping(valueMappingXml));

  return serviceCall;
}
