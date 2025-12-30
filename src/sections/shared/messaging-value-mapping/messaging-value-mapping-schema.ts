import { z } from "zod";
import { MessagingValueMapping } from "@/models/product/messaging-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * MessagingValueMapping validation schemas and validators
 */

// ValueMapping schema
export const valueMappingSchema = z.object({
  genericValue: z.string().min(1, "Generic value is required"),
  deviceValue: z.string().min(1, "Device value is required"),
});

// MessagingValueMapping schema
export const messagingValueMappingSchema = z.object({
  mapping: z.array(valueMappingSchema).min(1, "At least one mapping is required"),
});

// Type exports for TypeScript inference
export type ValueMappingInput = z.input<typeof valueMappingSchema>;
export type MessagingValueMappingInput = z.input<typeof messagingValueMappingSchema>;

// Validators
export function validateMessagingValueMapping(
  valueMapping: MessagingValueMapping
): ValidationResult<MessagingValueMapping> {
  const result = validateWithSchema(messagingValueMappingSchema, valueMapping);
  return result as ValidationResult<MessagingValueMapping>;
}
