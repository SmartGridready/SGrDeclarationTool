import { ResponseQuery, JMESPathMapping, JMESPathMappingRecord } from "@/models/generic";
import { wrapInArray, setOptionalXmlField } from "@/utils/builder-utils";

/**
 * Builds XML object for jmesPathMappingRecord from JMESPathMappingRecord model
 */
export function buildJmesPathMappingRecord(record: JMESPathMappingRecord): Record<string, unknown> {
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
export function buildJmesPathMapping(jmesPathMapping: JMESPathMapping): Record<string, unknown> {
  return {
    mapping: jmesPathMapping.mapping.map(buildJmesPathMappingRecord),
  };
}

/**
 * Builds XML object for responseQuery from ResponseQuery model
 */
export function buildResponseQuery(responseQuery: ResponseQuery | undefined): Record<string, unknown> | undefined {
  if (!responseQuery) {
    return undefined;
  }

  const responseQueryXml: Record<string, unknown> = {
    queryType: wrapInArray(responseQuery.queryType),
  };

  // Add query field if present - preserve empty strings as empty elements
  if ("query" in responseQuery && responseQuery.query !== undefined && responseQuery.query !== null) {
    responseQueryXml.query = wrapInArray(responseQuery.query);
  }

  // Add jmesPathMappings if present
  if ("jmesPathMappings" in responseQuery && responseQuery.jmesPathMappings) {
    responseQueryXml.jmesPathMappings = wrapInArray(buildJmesPathMapping(responseQuery.jmesPathMappings));
  }

  return responseQueryXml;
}
