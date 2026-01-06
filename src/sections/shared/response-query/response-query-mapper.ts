import { ResponseQuery, JMESPathMapping, JMESPathMappingRecord } from "@/models/generic";
import {
  getOptionalStringValue,
  getOptionalTypedValue,
  getFirstElement,
  mapArray,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";

/**
 * Maps XML jmesPathMappingRecord to JMESPathMappingRecord model
 */
export function mapJmesPathMappingRecord(recordXml: Xml2JsObject): JMESPathMappingRecord {
  const record: JMESPathMappingRecord = {
    from: getOptionalStringValue(recordXml, "from") || "",
    to: getOptionalStringValue(recordXml, "to") || "",
  };
  setOptionalField(record, "name", getOptionalStringValue(recordXml, "name"));
  return record;
}

/**
 * Maps XML jmesPathMapping to JMESPathMapping model
 */
export function mapJmesPathMapping(jmesPathMappingXml: Xml2JsObject): JMESPathMapping {
  return {
    mapping: mapArray(jmesPathMappingXml, "mapping", mapJmesPathMappingRecord),
  };
}

/**
 * Maps XML responseQuery to ResponseQuery model
 */
export function mapResponseQuery(responseQueryXml: Xml2JsObject | undefined): ResponseQuery | undefined {
  if (!responseQueryXml) {
    return undefined;
  }

  const queryType = getOptionalTypedValue<ResponseQuery["queryType"]>(responseQueryXml, "queryType");
  if (!queryType) {
    return undefined;
  }

  const baseResponseQuery: ResponseQuery = { queryType };

  // Check if it has a query field - preserve empty strings
  if (responseQueryXml.query !== undefined) {
    // If query exists in XML (even if empty), preserve it
    const query = getOptionalStringValue(responseQueryXml, "query") ?? "";
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
