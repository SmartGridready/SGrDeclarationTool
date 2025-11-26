import {
  FunctionalProfileDataPointList,
  FunctionalProfileDataPoint,
} from "@/models";
import { validateDataPointList } from "./data-point-list-validator";
import { buildLegibleDescription } from "@/sections/functional-profile/legible-description/legible-description-builder";

/**
 * Builds XML object for dataPointList from FunctionalProfileDataPointList model
 */
export function buildDataPointList(
  dataPointList: FunctionalProfileDataPointList
): any {
  const validation = validateDataPointList(dataPointList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || "Validation failed for data point list";
    throw new Error(errorMessage);
  }

  return {
    dataPointListElement: dataPointList.dataPointListElement.map((element) =>
      buildDataPointElement(element)
    ),
  };
}

/**
 * Builds XML object for a single dataPointListElement
 */
function buildDataPointElement(element: FunctionalProfileDataPoint): any {
  const dp = element.dataPoint;

  const dataPointXml: any = {
    dataPointName: [dp.dataPointName],
    dataDirection: [dp.dataDirection],
    presenceLevel: [dp.presenceLevel],
    dataType: [buildDataType(dp.dataType)],
    unit: [dp.unit],
  };

  // Add optional arrayLength
  if (dp.arrayLength !== undefined) {
    dataPointXml.arrayLength = [dp.arrayLength.toString()];
  }

  // Add legibleDescription if present
  if (dp.legibleDescription && dp.legibleDescription.length > 0) {
    dataPointXml.legibleDescription = buildLegibleDescription(
      dp.legibleDescription
    );
  }

  return {
    dataPoint: [dataPointXml],
  };
}

/**
 * Builds XML dataType element
 * The XML structure uses nested elements like <float64 /> instead of a string value
 */
function buildDataType(dataType: string): any {
  // Return an object with the dataType as a key with empty string value
  // xml2js will render this as a self-closing tag like <float64 />
  return { [dataType]: [""] };
}
