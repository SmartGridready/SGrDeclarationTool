import { MessagingDataPoint, MessageDataPointList } from "@/models/product/messaging-interface";
import { wrapInArray } from "@/utils/builder-utils";
import { buildDataPointBase } from "@/sections/shared/data-point-base/data-point-base-builder";
import { buildMessagingDataPointConfiguration } from "./messaging-data-point-configuration/messaging-data-point-configuration-builder";
import { validateMessageDataPointList } from "./messaging-data-point-list-schema";

/**
 * Builds XML object for dataPointListElement from MessagingDataPoint model
 */
function buildMessagingDataPoint(dataPoint: MessagingDataPoint): Record<string, unknown> {
  // Build the base data point properties
  const baseDataPointXml = buildDataPointBase(dataPoint);

  // Build the messaging-specific configuration
  const configXml = buildMessagingDataPointConfiguration(dataPoint.messagingDataPointConfiguration);

  return {
    ...baseDataPointXml,
    messagingDataPointConfiguration: wrapInArray(configXml),
  };
}

/**
 * Builds XML object for dataPointList from MessageDataPointList model
 * @throws Error if required fields are missing
 */
export function buildMessagingDataPointList(
  dataPointList: MessageDataPointList
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateMessageDataPointList(dataPointList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for messaging data point list";
    throw new Error(errorMessage);
  }

  return {
    dataPointListElement: dataPointList.dataPointListElement.map(buildMessagingDataPoint),
  };
}
