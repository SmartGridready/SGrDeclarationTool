import { GenericDataPointList } from "@/models/product/generic-interface";
import { DataPointBase } from "@/models/generic";
import { mapArray, Xml2JsObject } from "@/utils/mapper-utils";
import { mapDataPointBase } from "@/sections/shared/data-point-base/data-point-base-mapper";

/**
 * Maps XML dataPointList to GenericDataPointList model
 */
export function mapGenericDataPointList(
  dataPointListXml: Xml2JsObject | undefined
): GenericDataPointList {
  if (!dataPointListXml) {
    throw new Error("dataPointList is required");
  }

  return {
    dataPointListElement: mapArray(
      dataPointListXml,
      "dataPointListElement",
      mapGenericDataPoint,
      []
    ),
  };
}

/**
 * Maps XML dataPointListElement to DataPointBase model
 */
function mapGenericDataPoint(elementXml: Xml2JsObject): DataPointBase {
  // Map the base data point (dataPoint and optional genericAttributeList)
  // Generic interface uses DataPointBase directly without additional configuration
  return mapDataPointBase(elementXml);
}
