import { z } from "zod";
import { TimeSyncBlockNotification, REGISTER_TYPE_VALUES } from "@/models/product/modbus-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Time Sync Block Notification validation schemas and validators
 */

// Extract enum values from constants
const REGISTER_TYPE_VALUES_ARRAY = REGISTER_TYPE_VALUES as unknown as [string, ...string[]];

export const timeSyncBlockNotificationSchema = z.object({
  blockCacheIdentification: z
    .string({ message: "Block cache identification is required" })
    .min(1, "Block cache identification cannot be empty"),
  firstAddress: z.number().int().nonnegative({ message: "First address must be non-negative" }),
  size: z.number().int().positive({ message: "Size must be positive" }),
  registerType: z.enum(REGISTER_TYPE_VALUES_ARRAY, {
    message: "Register type is required",
  }),
  timeToLiveMs: z.number().int().positive({ message: "Time to live must be positive" }),
});

// Type exports for TypeScript inference
export type TimeSyncBlockNotificationInput = z.input<typeof timeSyncBlockNotificationSchema>;

// Validators
export function validateTimeSyncBlockNotification(
  notification: TimeSyncBlockNotification
): ValidationResult<TimeSyncBlockNotification> {
  const result = validateWithSchema(timeSyncBlockNotificationSchema, notification);
  return result as ValidationResult<TimeSyncBlockNotification>;
}
