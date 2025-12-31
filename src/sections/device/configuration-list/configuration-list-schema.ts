import { z } from "zod";
import { ConfigurationList, ConfigurationListElement } from "@/models";
import { dataTypeProductSchema } from "@/sections/shared/data-type-product/data-type-product-schema";
import { legibleDescriptionSchema } from "@/sections/shared/legible-description/legible-description-schema";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Configuration List validation schemas and validators
 */

// Configuration Description Schema (extends LegibleDescription with optional label)
const configurationDescriptionSchema = legibleDescriptionSchema.extend({
  label: z.string().optional(),
});

// Configuration List Element Schema
export const configurationListElementSchema = z.object({
  name: z.string({ message: "Configuration name is required" }).min(1, "Configuration name cannot be empty"),
  dataType: dataTypeProductSchema,
  defaultValue: z.string().optional(),
  configurationDescription: z.array(configurationDescriptionSchema).max(4).optional(),
});

// Configuration List Schema
export const configurationListSchema = z.object({
  configurationListElement: z
    .array(configurationListElementSchema)
    .min(1, "Configuration list must have at least one element"),
});

// Type exports for TypeScript inference
export type ConfigurationListElementInput = z.input<typeof configurationListElementSchema>;
export type ConfigurationListInput = z.input<typeof configurationListSchema>;

// Validators
export function validateConfigurationListElement(
  element: ConfigurationListElement
): ValidationResult<ConfigurationListElement> {
  const result = validateWithSchema(configurationListElementSchema, element);
  return result as ValidationResult<ConfigurationListElement>;
}

export function validateConfigurationList(configurationList: ConfigurationList): ValidationResult<ConfigurationList> {
  const result = validateWithSchema(configurationListSchema, configurationList);
  return result as ValidationResult<ConfigurationList>;
}
