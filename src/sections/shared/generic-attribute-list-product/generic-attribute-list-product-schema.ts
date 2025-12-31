import { z } from "zod";
import { GenericAttributeListProduct, GenericAttributeProduct, UNITS_VALUES } from "@/models";
import { dataTypeProductSchema } from "@/sections/shared/data-type-product/data-type-product-schema";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Generic Attribute List Product validation schemas and validators
 */

// Extract unit values from constants
const UNIT_VALUES = UNITS_VALUES as unknown as [string, ...string[]];

// Generic Attribute Product End Schema (for nested attributes)
export const genericAttributeProductEndSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name cannot be empty"),
  dataType: dataTypeProductSchema,
  value: z.string({ message: "Value is required" }).min(1, "Value cannot be empty"),
  unit: z.enum(UNIT_VALUES, {
    message: "Unit is required",
  }),
});

// Generic Attribute List Product End Schema (nested list)
export const genericAttributeListProductEndSchema = z.object({
  genericAttributeListElement: z.array(genericAttributeProductEndSchema),
});

// Generic Attribute Product Schema (union of simple and nested)
export const genericAttributeProductSchema = z.union([
  // Simple attribute (with dataType, value, unit)
  z.object({
    name: z.string({ message: "Name is required" }).min(1, "Name cannot be empty"),
    dataType: dataTypeProductSchema,
    value: z.string({ message: "Value is required" }).min(1, "Value cannot be empty"),
    unit: z.enum(UNIT_VALUES, {
      message: "Unit is required",
    }),
  }),
  // Nested attribute (with genericAttributeList)
  z.object({
    name: z.string({ message: "Name is required" }).min(1, "Name cannot be empty"),
    genericAttributeList: genericAttributeListProductEndSchema,
  }),
]);

// Generic Attribute List Product Schema
export const genericAttributeListProductSchema = z.object({
  genericAttributeListElement: z.array(genericAttributeProductSchema),
});

// Type exports for TypeScript inference
export type GenericAttributeProductEndInput = z.input<typeof genericAttributeProductEndSchema>;
export type GenericAttributeListProductEndInput = z.input<typeof genericAttributeListProductEndSchema>;
export type GenericAttributeProductInput = z.input<typeof genericAttributeProductSchema>;
export type GenericAttributeListProductInput = z.input<typeof genericAttributeListProductSchema>;

// Validators
export function validateGenericAttributeProduct(
  attribute: GenericAttributeProduct
): ValidationResult<GenericAttributeProduct> {
  const result = validateWithSchema(genericAttributeProductSchema, attribute);
  return result as ValidationResult<GenericAttributeProduct>;
}

export function validateGenericAttributeListProduct(
  attributeList: GenericAttributeListProduct
): ValidationResult<GenericAttributeListProduct> {
  const result = validateWithSchema(genericAttributeListProductSchema, attributeList);
  return result as ValidationResult<GenericAttributeListProduct>;
}
