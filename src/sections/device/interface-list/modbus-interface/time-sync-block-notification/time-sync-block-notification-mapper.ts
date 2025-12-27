import { TimeSyncBlockNotification, RegisterType } from "@/models/product/modbus-types";
import { getStringValue, getNumberValue, getTypedValue, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML timeSyncBlockNotification to TimeSyncBlockNotification model
 */
export function mapTimeSyncBlockNotification(
  timeSyncBlockNotificationXml: Xml2JsObject | undefined
): TimeSyncBlockNotification {
  if (!timeSyncBlockNotificationXml) {
    throw new Error("timeSyncBlockNotification is required");
  }

  return {
    blockCacheIdentification: getStringValue(
      timeSyncBlockNotificationXml,
      "blockCacheIdentification"
    ),
    firstAddress: getNumberValue(timeSyncBlockNotificationXml, "firstAddress", 0),
    size: getNumberValue(timeSyncBlockNotificationXml, "size", 1),
    registerType: getTypedValue<RegisterType>(
      timeSyncBlockNotificationXml,
      "registerType",
      "HoldRegister"
    ),
    timeToLiveMs: getNumberValue(timeSyncBlockNotificationXml, "timeToLiveMs", 1000),
  };
}
