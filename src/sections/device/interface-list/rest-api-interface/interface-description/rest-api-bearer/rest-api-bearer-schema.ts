import { z } from "zod";
import { RestApiBearer } from "@/models/product/rest-api-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { restApiServiceCallSchema } from "@/sections/shared/rest-api-service-call/rest-api-service-call-schema";

/**
 * RestApiBearer validation schemas and validators
 */

export const restApiBearerSchema = z.object({
  restApiServiceCall: restApiServiceCallSchema,
});

// Type exports for TypeScript inference
export type RestApiBearerInput = z.input<typeof restApiBearerSchema>;

// Validators
export function validateRestApiBearer(restApiBearer: RestApiBearer): ValidationResult<RestApiBearer> {
  const result = validateWithSchema(restApiBearerSchema, restApiBearer);
  return result as ValidationResult<RestApiBearer>;
}
