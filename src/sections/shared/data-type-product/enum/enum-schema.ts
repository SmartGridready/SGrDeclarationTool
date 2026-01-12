import { z } from "zod";
import { EnumMapProduct } from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Enum Product validation schemas and validators
 * Based on BaseTypes.xsd: EnumMapProduct requires at least one enumEntry (maxOccurs="unbounded", no minOccurs means minOccurs="1")
 */

// Enum Entry Product Record Schema
export const enumEntryProductRecordSchema = z.object({
  literal: z.string({ message: "Literal is required" }).min(1, "Literal cannot be empty"),
  ordinal: z.number().int().optional(),
  description: z.string().optional(),
});

// Enum Map Product Schema
// enumEntry has maxOccurs="unbounded" with no minOccurs (defaults to 1), so at least one entry is required
export const enumMapProductSchema = z.object({
  enumEntry: z.array(enumEntryProductRecordSchema).min(1, "At least one enum entry is required"),
  hexMask: z.string().optional(),
});

// Type exports for TypeScript inference
export type EnumEntryProductRecordInput = z.input<typeof enumEntryProductRecordSchema>;
export type EnumMapProductInput = z.input<typeof enumMapProductSchema>;

// Validators
export function validateEnumMapProduct(enumMap: EnumMapProduct): ValidationResult<EnumMapProduct> {
  const result = validateWithSchema(enumMapProductSchema, enumMap);
  return result as ValidationResult<EnumMapProduct>;
}
