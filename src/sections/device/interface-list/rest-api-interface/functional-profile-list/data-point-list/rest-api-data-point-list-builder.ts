import { RestApiDataPointList, RestApiDataPoint } from "@/models/product/rest-api-interface";
import { buildDataPointBase } from "@/sections/shared/data-point-base/data-point-base-builder";
import { buildRestApiDataPointConfiguration } from "./rest-api-data-point-configuration/rest-api-data-point-configuration-builder";
import { wrapInArray } from "@/utils/builder-utils";
import { validateRestApiDataPointList, validateRestApiDataPoint } from "./rest-api-data-point-list-schema";

/**
 * Builds XML object for dataPointList from RestApiDataPointList model
 * @throws Error if required fields are missing
 */
export function buildRestApiDataPointList(dataPointList: RestApiDataPointList): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateRestApiDataPointList(dataPointList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for REST API data point list";
    throw new Error(errorMessage);
  }

  const listXml: Record<string, unknown> = {
    dataPointListElement: dataPointList.dataPointListElement.map((dataPoint) => buildRestApiDataPoint(dataPoint)),
  };

  return listXml;
}

/**
 * Builds XML object for dataPointListElement from RestApiDataPoint model
 * @throws Error if required fields are missing
 */
function buildRestApiDataPoint(dataPoint: RestApiDataPoint): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateRestApiDataPoint(dataPoint);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for REST API data point";
    throw new Error(errorMessage);
  }

  // Start with the base data point structure
  const dataPointBaseXml = buildDataPointBase(dataPoint);
  const dataPointXml = dataPointBaseXml;

  // Include optional restApiDataPointConfiguration
  if (dataPoint.restApiDataPointConfiguration) {
    const configXml = buildRestApiDataPointConfiguration(dataPoint.restApiDataPointConfiguration);
    if (configXml) {
      dataPointXml.restApiDataPointConfiguration = wrapInArray(configXml);
    }
  }

  return dataPointXml;
}
