import { TimeSyncBlockNotification } from "@/models/product/modbus-types";
import { wrapInArray } from "@/utils/builder-utils";

/**
 * Builds XML object for timeSyncBlockNotification from TimeSyncBlockNotification model
 */
export function buildTimeSyncBlockNotification(
  notification: TimeSyncBlockNotification
): Record<string, unknown> {
  const notificationXml: Record<string, unknown> = {
    blockCacheIdentification: wrapInArray(notification.blockCacheIdentification),
    firstAddress: wrapInArray(notification.firstAddress),
    size: wrapInArray(notification.size),
    registerType: wrapInArray(notification.registerType),
    timeToLiveMs: wrapInArray(notification.timeToLiveMs),
  };

  return notificationXml;
}
