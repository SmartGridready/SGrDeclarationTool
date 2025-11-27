import {
  FunctionalProfileDataPointList,
  FunctionalProfileDataPoint,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  DataTypeFunctionalProfile,
  Units,
} from "@/models";
import { mapLegibleDescription } from "@/sections/functional-profile/legible-description/legible-description-mapper";
import { createDataTypeFromString } from "@/sections/functional-profile/data-point-list/data-type-utils";

/**
 * Maps XML dataPointList to FunctionalProfileDataPointList model
 */
export function mapDataPointList(
  dataPointListXml: any
): FunctionalProfileDataPointList {
  const elements = dataPointListXml.dataPointListElement;

  if (!Array.isArray(elements)) {
    return { dataPointListElement: [] };
  }

  return {
    dataPointListElement: elements.map((element: any) =>
      mapDataPointElement(element)
    ),
  };
}

/**
 * Maps a single XML dataPointListElement to FunctionalProfileDataPoint model
 */
function mapDataPointElement(elementXml: any): FunctionalProfileDataPoint {
  const dpXml = elementXml.dataPoint?.[0];

  if (!dpXml) {
    return {
      dataPoint: {
        dataPointName: "",
        dataDirection: "R",
        presenceLevel: "M",
        dataType: "float64",
        unit: "NO_UNITS",
      },
    };
  }

  const dataPoint: FunctionalProfileDataPoint = {
    dataPoint: {
      dataPointName: dpXml.dataPointName?.[0] || "",
      dataDirection:
        (dpXml.dataDirection?.[0] as DataDirectionFunctionalProfile) || "R",
      presenceLevel: (dpXml.presenceLevel?.[0] as PresenceLevel) || "M",
      dataType: mapDataType(dpXml.dataType?.[0]),
      unit: (dpXml.unit?.[0] as Units) || "NO_UNITS",
    },
  };

  // Map optional arrayLength
  if (dpXml.arrayLength?.[0]) {
    dataPoint.dataPoint.arrayLength = parseInt(dpXml.arrayLength[0], 10);
  }

  // Map legibleDescription if present
  if (dpXml.legibleDescription && Array.isArray(dpXml.legibleDescription)) {
    dataPoint.dataPoint.legibleDescription = mapLegibleDescription(
      dpXml.legibleDescription
    );
  }

  return dataPoint;
}

/**
 * Maps XML dataType to DataTypeFunctionalProfile
 * The XML structure uses nested elements like <float64 /> instead of a string value
 */
function mapDataType(dataTypeXml: any): DataTypeFunctionalProfile {
  if (!dataTypeXml) {
    return "float64";
  }

  // Check for each possible data type element
  const typeMap: Record<string, DataTypeFunctionalProfile> = {
    boolean: "boolean",
    int8: "int8",
    int16: "int16",
    int32: "int32",
    int64: "int64",
    int8U: "int8U",
    int16U: "int16U",
    int32U: "int32U",
    int64U: "int64U",
    float32: "float32",
    float64: "float64",
    dateTime: "dateTime",
    string: "string",
  };

  for (const [key, value] of Object.entries(typeMap)) {
    if (dataTypeXml[key] !== undefined) {
      return value;
    }
  }

  return "float64";
}
