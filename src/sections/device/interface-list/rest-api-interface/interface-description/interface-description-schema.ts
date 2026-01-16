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

// Note: restApiUri is type="anyURI" in XSD, restApiVerifyCertificate is type="booleanParameter"
export const restApiInterfaceDescriptionSchema = z.object({
  restApiInterfaceSelection: z.enum(REST_API_INTERFACE_SELECTION_VALUES_ARRAY, {
    message: "REST API interface selection is required",
  }),
  restApiUri: z.string({ message: "REST API URI is required" }).min(1, "REST API URI cannot be empty"),
  restApiAuthenticationMethod: z.enum(REST_API_AUTHENTICATION_METHOD_VALUES_ARRAY).optional(),
  restApiBearer: restApiBearerSchema.optional(),
  restApiBasic: restApiBasicSchema.optional(),
  // booleanParameter pattern: \{\{.+\}\}|true|false
  restApiVerifyCertificate: z
    .string()
    .regex(/^(\{\{.+\}\}|true|false)$/, "Must be 'true', 'false', or a variable (e.g., {{verify}})")
    .optional(),
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
