import { ContactsDataPointList } from "@/models/product/contact-interface";
import { DataPointBase } from "@/models/generic";
import { buildDataPointBase } from "@/sections/shared/data-point-base/data-point-base-builder";
import {
  validateContactDataPointList,
  validateContactDataPoint,
} from "./contact-data-point-list-schema";

/**
 * Builds XML object for dataPointList from ContactsDataPointList model
 * @throws Error if required fields are missing
 */
export function buildContactDataPointList(
  dataPointList: ContactsDataPointList
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateContactDataPointList(dataPointList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Contact data point list";
    throw new Error(errorMessage);
  }

  const listXml: Record<string, unknown> = {
    dataPointListElement: dataPointList.dataPointListElement.map((dataPoint) =>
      buildContactDataPoint(dataPoint)
    ),
  };

  return listXml;
}

/**
 * Builds XML object for dataPointListElement from DataPointBase model
 * @throws Error if required fields are missing
 */
function buildContactDataPoint(dataPoint: DataPointBase): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateContactDataPoint(dataPoint);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for Contact data point";
    throw new Error(errorMessage);
  }

  // Use the base data point builder directly since contact interface
  // doesn't have additional configuration like REST API or Modbus
  return buildDataPointBase(dataPoint);
}
