import { GenericDataPointList } from "@/models/product/generic-interface";
import { DataPointBase } from "@/models/generic";
import { buildDataPointBase } from "@/sections/shared/data-point-base/data-point-base-builder";
import { validateGenericDataPointList, validateGenericDataPoint } from "./generic-data-point-list-schema";

/**
 * Builds XML object for dataPointList from GenericDataPointList model
 * @throws Error if required fields are missing
 */
export function buildGenericDataPointList(dataPointList: GenericDataPointList): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateGenericDataPointList(dataPointList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Generic data point list";
    throw new Error(errorMessage);
  }

  const listXml: Record<string, unknown> = {
    dataPointListElement: dataPointList.dataPointListElement.map((dataPoint) => buildGenericDataPoint(dataPoint)),
  };

  return listXml;
}

/**
 * Builds XML object for dataPointListElement from DataPointBase model
 * @throws Error if required fields are missing
 */
function buildGenericDataPoint(dataPoint: DataPointBase): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateGenericDataPoint(dataPoint);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Generic data point";
    throw new Error(errorMessage);
  }

  // Use the base data point builder directly since generic interface
  // doesn't have additional configuration like REST API or Modbus
  return buildDataPointBase(dataPoint);
}
