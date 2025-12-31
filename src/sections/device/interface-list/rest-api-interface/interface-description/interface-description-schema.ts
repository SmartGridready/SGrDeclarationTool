import { z } from "zod";
import {
  RestApiInterfaceDescription,
  REST_API_INTERFACE_SELECTION_VALUES,
  REST_API_AUTHENTICATION_METHOD_VALUES,
} from "@/models/product/rest-api-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { restApiBasicSchema } from "./rest-api-basic/rest-api-basic-schema";
import { restApiBearerSchema } from "./rest-api-bearer/rest-api-bearer-schema";

/**
 * RestApiInterfaceDescription validation schemas and validators
 */

// Extract enum values from constants
const REST_API_INTERFACE_SELECTION_VALUES_ARRAY = REST_API_INTERFACE_SELECTION_VALUES as unknown as [
  string,
  ...string[],
];
const REST_API_AUTHENTICATION_METHOD_VALUES_ARRAY = REST_API_AUTHENTICATION_METHOD_VALUES as unknown as [
  string,
  ...string[],
];

export const restApiInterfaceDescriptionSchema = z.object({
  restApiInterfaceSelection: z.enum(REST_API_INTERFACE_SELECTION_VALUES_ARRAY),
  restApiUri: z.string().min(1),
  restApiAuthenticationMethod: z.enum(REST_API_AUTHENTICATION_METHOD_VALUES_ARRAY).optional(),
  restApiBearer: restApiBearerSchema.optional(),
  restApiBasic: restApiBasicSchema.optional(),
  restApiVerifyCertificate: z.string().optional(),
});

// Type exports for TypeScript inference
export type RestApiInterfaceDescriptionInput = z.input<typeof restApiInterfaceDescriptionSchema>;

// Validators
export function validateRestApiInterfaceDescription(
  description: RestApiInterfaceDescription
): ValidationResult<RestApiInterfaceDescription> {
  const result = validateWithSchema(restApiInterfaceDescriptionSchema, description);
  return result as ValidationResult<RestApiInterfaceDescription>;
}
