import { z } from "zod";
import { DynamicParameterDescriptionList } from "@/models";
import { legibleDescriptionSchema } from "@/sections/shared/legible-description/legible-description-schema";
import { dataTypeProductSchema } from "@/sections/shared/data-type-product/data-type-product-schema";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Dynamic Parameter List validation schemas
 * These schemas validate the parameterList structure used in DataPoints
 */

// Dynamic Parameter Description Schema (extends LegibleDescription with optional label)
export const dynamicParameterDescriptionSchema = legibleDescriptionSchema.extend({
  label: z.string().optional(),
});

// Parameter List Element Schema
export const parameterListElementSchema = z.object({
  name: z.string({ message: "Parameter name is required" }).min(1, "Parameter name cannot be empty"),
  dataType: dataTypeProductSchema,
  defaultValue: z.string().optional(),
  parameterDescription: z.array(dynamicParameterDescriptionSchema).max(4).optional(),
});

// Parameter List Schema
export const dynamicParameterListSchema = z.object({
  parameterListElement: z.array(parameterListElementSchema).optional(),
});

// Type exports for TypeScript inference
export type DynamicParameterDescriptionInput = z.input<typeof dynamicParameterDescriptionSchema>;
export type ParameterListElementInput = z.input<typeof parameterListElementSchema>;
export type DynamicParameterListInput = z.input<typeof dynamicParameterListSchema>;

// Validators
export function validateDynamicParameterList(
  parameterList: DynamicParameterDescriptionList
): ValidationResult<DynamicParameterDescriptionList> {
  const result = validateWithSchema(dynamicParameterListSchema, parameterList);
  return result as ValidationResult<DynamicParameterDescriptionList>;
}
