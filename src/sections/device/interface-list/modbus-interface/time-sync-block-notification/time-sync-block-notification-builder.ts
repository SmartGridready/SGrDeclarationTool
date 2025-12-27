import { TimeSyncBlockNotification } from "@/models/product/modbus-types";
import { wrapInArray } from "@/utils/builder-utils";
import { validateTimeSyncBlockNotification } from "./time-sync-block-notification-schema";

/**
 * Builds XML object for timeSyncBlockNotification from TimeSyncBlockNotification model
 * @throws Error if required fields are missing
 */
export function buildTimeSyncBlockNotification(
  notification: TimeSyncBlockNotification
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateTimeSyncBlockNotification(notification);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || "Validation failed for time sync block notification";
    throw new Error(errorMessage);
  }
  const notificationXml: Record<string, unknown> = {
    blockCacheIdentification: wrapInArray(notification.blockCacheIdentification),
    firstAddress: wrapInArray(notification.firstAddress),
    size: wrapInArray(notification.size),
    registerType: wrapInArray(notification.registerType),
    timeToLiveMs: wrapInArray(notification.timeToLiveMs),
  };

  return notificationXml;
}
