import { z } from "zod";
import { RestApiBasic } from "@/models/product/rest-api-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * RestApiBasic validation schemas and validators
 */

export const restApiBasicSchema = z.object({
  restBasicUsername: z.string().min(1),
  restBasicPassword: z.string().min(1),
});

// Type exports for TypeScript inference
export type RestApiBasicInput = z.input<typeof restApiBasicSchema>;

// Validators
export function validateRestApiBasic(restApiBasic: RestApiBasic): ValidationResult<RestApiBasic> {
  const result = validateWithSchema(restApiBasicSchema, restApiBasic);
  return result as ValidationResult<RestApiBasic>;
}
