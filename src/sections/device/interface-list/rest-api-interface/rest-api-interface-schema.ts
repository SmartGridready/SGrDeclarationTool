import { z } from "zod";
import { RestApiInterface } from "@/models/product/rest-api-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { restApiInterfaceDescriptionSchema } from "./interface-description/interface-description-schema";
import { restApiFunctionalProfileListSchema } from "./functional-profile-list/rest-api-functional-profile-list-schema";

/**
 * REST API Interface validation schemas and validators
 */

export const restApiInterfaceSchema = z.object({
  restApiInterfaceDescription: restApiInterfaceDescriptionSchema,
  functionalProfileList: restApiFunctionalProfileListSchema,
});

// Type exports for TypeScript inference
export type RestApiInterfaceInput = z.input<typeof restApiInterfaceSchema>;

// Validators
export function validateRestApiInterface(
  restApiInterface: RestApiInterface
): ValidationResult<RestApiInterface> {
  const result = validateWithSchema(restApiInterfaceSchema, restApiInterface);
  return result as ValidationResult<RestApiInterface>;
}
