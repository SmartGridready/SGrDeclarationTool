import { z } from "zod";
import { ScalingFactor } from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Scaling Factor validation schemas and validators
 */

export const scalingFactorSchema = z.object({
  multiplicator: z.number({ message: "Multiplicator is required" }),
  powerof10: z.number({ message: "Power of 10 is required" }),
});

// Type exports for TypeScript inference
export type ScalingFactorInput = z.input<typeof scalingFactorSchema>;

// Validators
export function validateScalingFactor(
  scalingFactor: ScalingFactor
): ValidationResult<ScalingFactor> {
  const result = validateWithSchema(scalingFactorSchema, scalingFactor);
  return result as ValidationResult<ScalingFactor>;
}
