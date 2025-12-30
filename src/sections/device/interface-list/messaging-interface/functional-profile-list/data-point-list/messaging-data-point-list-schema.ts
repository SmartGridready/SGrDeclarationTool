import { z } from "zod";
import { MessageDataPointList, MessagingDataPoint } from "@/models/product/messaging-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { dataPointBaseSchema } from "@/sections/shared/data-point-base/data-point-base-schema";
import { messagingDataPointConfigurationSchema } from "./messaging-data-point-configuration/messaging-data-point-configuration-schema";

/**
 * Messaging Data Point List validation schemas and validators
 */

// MessagingDataPoint schema (extends dataPointBase)
export const messagingDataPointSchema = dataPointBaseSchema.extend({
  messagingDataPointConfiguration: messagingDataPointConfigurationSchema,
});

// MessageDataPointList schema
export const messageDataPointListSchema = z.object({
  dataPointListElement: z
    .array(messagingDataPointSchema)
    .min(1, "At least one data point is required"),
});

// Type exports for TypeScript inference
export type MessagingDataPointInput = z.input<typeof messagingDataPointSchema>;
export type MessageDataPointListInput = z.input<typeof messageDataPointListSchema>;

// Validators
export function validateMessagingDataPoint(
  dataPoint: MessagingDataPoint
): ValidationResult<MessagingDataPoint> {
  const result = validateWithSchema(messagingDataPointSchema, dataPoint);
  return result as ValidationResult<MessagingDataPoint>;
}

export function validateMessageDataPointList(
  dataPointList: MessageDataPointList
): ValidationResult<MessageDataPointList> {
  const result = validateWithSchema(messageDataPointListSchema, dataPointList);
  return result as ValidationResult<MessageDataPointList>;
}
