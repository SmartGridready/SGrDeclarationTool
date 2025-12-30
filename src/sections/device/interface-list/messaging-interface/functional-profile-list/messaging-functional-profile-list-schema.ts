import { z } from "zod";
import {
  MessagingFunctionalProfile,
  MessagingFunctionalProfileList,
} from "@/models/product/messaging-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { functionalProfileBaseSchema } from "@/sections/shared/functional-profile-base/functional-profile-base-schema";
import { messageDataPointListSchema } from "./data-point-list/messaging-data-point-list-schema";

/**
 * Messaging Functional Profile List validation schemas and validators
 */

// MessagingFunctionalProfile schema (extends functionalProfileBase)
export const messagingFunctionalProfileSchema = functionalProfileBaseSchema.extend({
  dataPointList: messageDataPointListSchema,
});

// MessagingFunctionalProfileList schema
export const messagingFunctionalProfileListSchema = z.object({
  functionalProfileListElement: z
    .array(messagingFunctionalProfileSchema)
    .min(1, "At least one functional profile is required"),
});

// Type exports for TypeScript inference
export type MessagingFunctionalProfileInput = z.input<typeof messagingFunctionalProfileSchema>;
export type MessagingFunctionalProfileListInput = z.input<
  typeof messagingFunctionalProfileListSchema
>;

// Validators
export function validateMessagingFunctionalProfile(
  functionalProfile: MessagingFunctionalProfile
): ValidationResult<MessagingFunctionalProfile> {
  const result = validateWithSchema(messagingFunctionalProfileSchema, functionalProfile);
  return result as ValidationResult<MessagingFunctionalProfile>;
}

export function validateMessagingFunctionalProfileList(
  functionalProfileList: MessagingFunctionalProfileList
): ValidationResult<MessagingFunctionalProfileList> {
  const result = validateWithSchema(messagingFunctionalProfileListSchema, functionalProfileList);
  return result as ValidationResult<MessagingFunctionalProfileList>;
}
