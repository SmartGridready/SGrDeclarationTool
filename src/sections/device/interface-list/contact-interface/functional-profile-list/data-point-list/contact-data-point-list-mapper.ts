import { ContactsDataPointList } from "@/models/product/contact-interface";
import { DataPointBase } from "@/models/generic";
import { mapArray, Xml2JsObject } from "@/utils/mapper-utils";
import { mapDataPointBase } from "@/sections/shared/data-point-base/data-point-base-mapper";

/**
 * Maps XML dataPointList to ContactsDataPointList model
 */
export function mapContactDataPointList(
  dataPointListXml: Xml2JsObject | undefined
): ContactsDataPointList {
  if (!dataPointListXml) {
    throw new Error("dataPointList is required");
  }

  return {
    dataPointListElement: mapArray(
      dataPointListXml,
      "dataPointListElement",
      mapContactDataPoint,
      []
    ),
  };
}

/**
 * Maps XML dataPointListElement to DataPointBase model
 */
function mapContactDataPoint(elementXml: Xml2JsObject): DataPointBase {
  // Map the base data point (dataPoint and optional genericAttributeList)
  // Contact interface uses DataPointBase directly without additional configuration
  return mapDataPointBase(elementXml);
}
