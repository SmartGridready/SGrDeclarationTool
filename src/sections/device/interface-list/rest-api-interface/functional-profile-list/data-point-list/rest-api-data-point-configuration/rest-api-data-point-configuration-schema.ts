import { z } from "zod";
import {
  RestApiDataPointConfiguration,
  REST_API_DATA_TYPE_VALUES,
} from "@/models/product/rest-api-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { restApiServiceCallSchema } from "@/sections/shared/rest-api-service-call/rest-api-service-call-schema";

/**
 * RestApiDataPointConfiguration validation schemas and validators
 */

// Extract enum values from constants
const REST_API_DATA_TYPE_VALUES_ARRAY = REST_API_DATA_TYPE_VALUES as unknown as [
  string,
  ...string[],
];

// Base schema with dataType
const dataPointConfigurationBaseSchema = z.object({
  dataType: z.enum(REST_API_DATA_TYPE_VALUES_ARRAY),
});

// Single service call configuration
const singleServiceCallConfigSchema = dataPointConfigurationBaseSchema.extend({
  restApiServiceCall: restApiServiceCallSchema,
});

// Write-Read service call configuration
const writeReadServiceCallConfigSchema = dataPointConfigurationBaseSchema.extend({
  restApiWriteServiceCall: restApiServiceCallSchema,
  restApiReadServiceCall: restApiServiceCallSchema.optional(),
});

// Read-Write service call configuration
const readWriteServiceCallConfigSchema = dataPointConfigurationBaseSchema.extend({
  restApiReadServiceCall: restApiServiceCallSchema,
  restApiWriteServiceCall: restApiServiceCallSchema.optional(),
});

// Union schema for all configurations
export const restApiDataPointConfigurationSchema = z.union([
  singleServiceCallConfigSchema,
  writeReadServiceCallConfigSchema,
  readWriteServiceCallConfigSchema,
]);

// Type exports for TypeScript inference
export type RestApiDataPointConfigurationInput = z.input<
  typeof restApiDataPointConfigurationSchema
>;

// Validators
export function validateRestApiDataPointConfiguration(
  configuration: RestApiDataPointConfiguration
): ValidationResult<RestApiDataPointConfiguration> {
  const result = validateWithSchema(restApiDataPointConfigurationSchema, configuration);
  return result as ValidationResult<RestApiDataPointConfiguration>;
}
