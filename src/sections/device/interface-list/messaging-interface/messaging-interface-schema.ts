import { z } from "zod";
import { MessagingInterface } from "@/models/product/messaging-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { messagingInterfaceDescriptionSchema } from "./interface-description/interface-description-schema";
import { messagingFunctionalProfileListSchema } from "./functional-profile-list/messaging-functional-profile-list-schema";

/**
 * Messaging Interface validation schemas and validators
 */

export const messagingInterfaceSchema = z.object({
  messagingInterfaceDescription: messagingInterfaceDescriptionSchema,
  functionalProfileList: messagingFunctionalProfileListSchema,
});

// Type exports for TypeScript inference
export type MessagingInterfaceInput = z.input<typeof messagingInterfaceSchema>;

// Validators
export function validateMessagingInterface(
  messagingInterface: MessagingInterface
): ValidationResult<MessagingInterface> {
  const result = validateWithSchema(messagingInterfaceSchema, messagingInterface);
  return result as ValidationResult<MessagingInterface>;
}
