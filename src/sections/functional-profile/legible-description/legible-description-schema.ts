import { z } from "zod";
import { LegibleDescription } from "@/models";
import { LANGUAGE_OPTIONS } from "@/sections/functional-profile/legible-description/legible-description-form-options";
import {
  ValidationResult,
  validateWithSchema,
} from "@/sections/shared/utils/validation-utils";

/**
 * Legible Description validation schemas and validators
 */

// Extract language values from constants
const LANGUAGE_VALUES = LANGUAGE_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];

// Legible Description Schema
export const legibleDescriptionSchema = z.object({
  textElement: z
    .string({ message: "Text element is required" })
    .min(1, "Text element cannot be empty")
    .max(4000, "Text element cannot exceed 4000 characters"),
  language: z.enum(LANGUAGE_VALUES, {
    message: "Language is required",
  }),
  uri: z.string().optional(),
});

// Legible Descriptions Schema (array, maxOccurs="4")
export const legibleDescriptionsSchema = z
  .array(legibleDescriptionSchema)
  .max(4, "Cannot have more than 4 legible descriptions");

// Type exports for TypeScript inference
export type LegibleDescriptionInput = z.input<typeof legibleDescriptionSchema>;
export type LegibleDescriptionsInput = z.input<
  typeof legibleDescriptionsSchema
>;

// Validators
export function validateLegibleDescription(
  legibleDescription: LegibleDescription
): ValidationResult<LegibleDescription> {
  const result = validateWithSchema(
    legibleDescriptionSchema,
    legibleDescription
  );
  return result as ValidationResult<LegibleDescription>;
}

export function validateLegibleDescriptionArray(
  legibleDescriptions: LegibleDescription[]
): ValidationResult<LegibleDescription[]> {
  const result = validateWithSchema(
    legibleDescriptionsSchema,
    legibleDescriptions
  );
  return result as ValidationResult<LegibleDescription[]>;
}
