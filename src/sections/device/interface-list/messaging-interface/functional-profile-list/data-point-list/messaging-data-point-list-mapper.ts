import { MessagingDataPoint, MessageDataPointList } from "@/models/product/messaging-interface";
import { mapArray, getFirstElement, Xml2JsObject } from "@/utils/mapper-utils";
import { mapDataPointBase } from "@/sections/shared/data-point-base/data-point-base-mapper";
import { mapMessagingDataPointConfiguration } from "./messaging-data-point-configuration/messaging-data-point-configuration-mapper";

/**
 * Maps XML dataPointListElement to MessagingDataPoint model
 */
function mapMessagingDataPoint(xml: Xml2JsObject): MessagingDataPoint {
  // Map the base data point properties
  const baseDataPoint = mapDataPointBase(xml);

  // Map the messaging-specific configuration
  const messagingDataPointConfigurationXml = getFirstElement(
    xml,
    "messagingDataPointConfiguration"
  );

  return {
    ...baseDataPoint,
    messagingDataPointConfiguration: mapMessagingDataPointConfiguration(
      messagingDataPointConfigurationXml
    ),
  };
}

/**
 * Maps XML dataPointList to MessageDataPointList model
 */
export function mapMessagingDataPointList(xml: Xml2JsObject | undefined): MessageDataPointList {
  if (!xml) {
    return { dataPointListElement: [] };
  }

  return {
    dataPointListElement: mapArray(xml, "dataPointListElement", mapMessagingDataPoint),
  };
}
