import { z } from "zod";
import { RestApiServiceCall, HTTP_METHOD_VALUES } from "@/models/product/rest-api-types";
import { RESPONSE_QUERY_TYPE_VALUES } from "@/models/generic";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * RestApiServiceCall validation schemas and validators
 */

// Extract enum values from constants
const HTTP_METHOD_VALUES_ARRAY = HTTP_METHOD_VALUES as unknown as [string, ...string[]];
const RESPONSE_QUERY_TYPE_VALUES_ARRAY = RESPONSE_QUERY_TYPE_VALUES as unknown as [string, ...string[]];

// HeaderEntry schema
const headerEntrySchema = z.object({
  headerName: z.string().min(1),
  value: z.string().min(1),
});

// HeaderList schema
const headerListSchema = z.object({
  header: z.array(headerEntrySchema).optional(),
});

// ParameterEntry schema
const parameterEntrySchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

// ParameterList schema
const parameterListSchema = z.object({
  parameter: z.array(parameterEntrySchema).min(1),
});

// ValueMapping schema
const valueMappingSchema = z.object({
  genericValue: z.string().min(1),
  deviceValue: z.string().min(1),
});

// RestApiValueMapping schema
const restApiValueMappingSchema = z.object({
  mapping: z.array(valueMappingSchema).min(1),
});

// JMESPathMappingRecord schema
const jmesPathMappingRecordSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  name: z.string().optional(),
});

// JMESPathMapping schema
const jmesPathMappingSchema = z.object({
  mapping: z.array(jmesPathMappingRecordSchema).min(1),
});

// ResponseQuery schema - union type
const responseQueryBaseSchema = z.object({
  queryType: z.enum(RESPONSE_QUERY_TYPE_VALUES_ARRAY),
});

const responseQueryWithQuerySchema = responseQueryBaseSchema.extend({
  query: z.string().min(1),
});

const responseQueryWithJmesPathMappingsSchema = responseQueryBaseSchema.extend({
  jmesPathMappings: jmesPathMappingSchema,
});

const responseQuerySchema = z.union([
  responseQueryBaseSchema,
  responseQueryWithQuerySchema,
  responseQueryWithJmesPathMappingsSchema,
]);

// RestApiServiceCall schema
export const restApiServiceCallSchema = z.object({
  requestHeader: headerListSchema.optional(),
  requestMethod: z.enum(HTTP_METHOD_VALUES_ARRAY),
  requestPath: z.string().optional(),
  requestQuery: parameterListSchema.optional(),
  requestForm: parameterListSchema.optional(),
  requestBody: z.string().optional(),
  responseQuery: responseQuerySchema.optional(),
  valueMapping: restApiValueMappingSchema.optional(),
});

// Type exports for TypeScript inference
export type RestApiServiceCallInput = z.input<typeof restApiServiceCallSchema>;

// Validators
export function validateRestApiServiceCall(serviceCall: RestApiServiceCall): ValidationResult<RestApiServiceCall> {
  const result = validateWithSchema(restApiServiceCallSchema, serviceCall);
  return result as ValidationResult<RestApiServiceCall>;
}
