import { z } from "zod";
import { BitmapProduct } from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Bitmap Product validation schemas and validators
 * Based on BaseTypes.xsd: BitmapProduct requires at least one bitmapEntry (maxOccurs="unbounded", no minOccurs means minOccurs="1")
 */

// Bitmap Entry Product Schema
export const bitmapEntryProductSchema = z.object({
  literal: z.string({ message: "Literal is required" }).min(1, "Literal cannot be empty"),
  hexMask: z.string({ message: "Hex mask is required" }).min(1, "Hex mask cannot be empty"),
  description: z.string().optional(),
});

// Bitmap Product Schema
// bitmapEntry has maxOccurs="unbounded" with no minOccurs (defaults to 1), so at least one entry is required
export const bitmapProductSchema = z.object({
  bitmapEntry: z.array(bitmapEntryProductSchema).min(1, "At least one bitmap entry is required"),
});

// Type exports for TypeScript inference
export type BitmapEntryProductInput = z.input<typeof bitmapEntryProductSchema>;
export type BitmapProductInput = z.input<typeof bitmapProductSchema>;

// Validators
export function validateBitmapProduct(bitmap: BitmapProduct): ValidationResult<BitmapProduct> {
  const result = validateWithSchema(bitmapProductSchema, bitmap);
  return result as ValidationResult<BitmapProduct>;
}
