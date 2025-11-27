import { z } from "zod";
import { AlternativeNames } from "@/models";
import {
  ValidationResult,
  validateWithSchema,
} from "@/sections/shared/utils/validation-utils";

/**
 * Alternative Names validation schemas and validators
 * All fields are optional strings
 */

// Alternative Names Schema
export const alternativeNamesSchema = z.object({
  sLV1Name: z.string().optional(),
  workName: z.string().optional(),
  manufName: z.string().optional(),
  iec61850Name: z.string().optional(),
  sarefName: z.string().optional(),
  eebusName: z.string().optional(),
  sunSpecName: z.string().optional(),
  hpBwpName: z.string().optional(),
  en17609Name: z.string().optional(),
});

// Type exports for TypeScript inference
export type AlternativeNamesInput = z.input<typeof alternativeNamesSchema>;

// Validators
export function validateAlternativeNames(
  alternativeNames: AlternativeNames
): ValidationResult<AlternativeNames> {
  const result = validateWithSchema(alternativeNamesSchema, alternativeNames);
  return result as ValidationResult<AlternativeNames>;
}
