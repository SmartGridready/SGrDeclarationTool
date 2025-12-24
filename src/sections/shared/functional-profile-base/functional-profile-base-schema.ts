import { z } from "zod";
import { FunctionalProfileBase, FunctionalProfileDescription } from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { functionalProfileIdentificationSchema } from "@/sections/shared/profile-identification/profile-identification-schema";
import { alternativeNamesSchema } from "@/sections/shared/alternative-names/alternative-names-schema";
import { legibleDescriptionSchema } from "@/sections/shared/legible-description/legible-description-schema";
import { genericAttributeListProductSchema } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-schema";

/**
 * Functional Profile Base validation schemas and validators
 */

// Functional Profile Description Schema
export const functionalProfileDescriptionSchema = z.object({
  functionalProfileName: z
    .string({ message: "Functional profile name is required" })
    .min(1, "Functional profile name cannot be empty"),
  functionalProfileIdentification: functionalProfileIdentificationSchema,
  alternativeNames: alternativeNamesSchema.optional(),
  legibleDescription: z
    .array(legibleDescriptionSchema)
    .max(4, "Maximum 4 legible descriptions allowed")
    .optional(),
  programmerHints: z
    .array(legibleDescriptionSchema)
    .max(4, "Maximum 4 programmer hints allowed")
    .optional(),
});

// Functional Profile Base Schema
export const functionalProfileBaseSchema = z.object({
  functionalProfile: functionalProfileDescriptionSchema,
  genericAttributeList: genericAttributeListProductSchema.optional(),
});

// Type exports for TypeScript inference
export type FunctionalProfileDescriptionInput = z.input<typeof functionalProfileDescriptionSchema>;
export type FunctionalProfileBaseInput = z.input<typeof functionalProfileBaseSchema>;

// Validators
export function validateFunctionalProfileDescription(
  description: FunctionalProfileDescription
): ValidationResult<FunctionalProfileDescription> {
  const result = validateWithSchema(functionalProfileDescriptionSchema, description);
  return result as ValidationResult<FunctionalProfileDescription>;
}

export function validateFunctionalProfileBase(
  functionalProfile: FunctionalProfileBase
): ValidationResult<FunctionalProfileBase> {
  const result = validateWithSchema(functionalProfileBaseSchema, functionalProfile);
  return result as ValidationResult<FunctionalProfileBase>;
}
