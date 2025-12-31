import { z } from "zod";
import { ResponseQuery, RESPONSE_QUERY_TYPE_VALUES } from "@/models/generic";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * ResponseQuery validation schemas and validators
 */

// Extract enum values from constants
const RESPONSE_QUERY_TYPE_VALUES_ARRAY = RESPONSE_QUERY_TYPE_VALUES as unknown as [string, ...string[]];

// JMESPathMappingRecord schema
export const jmesPathMappingRecordSchema = z.object({
  from: z.string().min(1, "From path is required"),
  to: z.string().min(1, "To path is required"),
  name: z.string().optional(),
});

// JMESPathMapping schema
export const jmesPathMappingSchema = z.object({
  mapping: z.array(jmesPathMappingRecordSchema).min(1, "At least one mapping is required"),
});

// ResponseQuery base schema
const responseQueryBaseSchema = z.object({
  queryType: z.enum(RESPONSE_QUERY_TYPE_VALUES_ARRAY, {
    message: "Query type is required",
  }),
});

// ResponseQuery with query field (can be empty string per XSD)
const responseQueryWithQuerySchema = responseQueryBaseSchema.extend({
  query: z.string(),
});

// ResponseQuery with jmesPathMappings field
const responseQueryWithJmesPathMappingsSchema = responseQueryBaseSchema.extend({
  jmesPathMappings: jmesPathMappingSchema,
});

// Union of all ResponseQuery variants
export const responseQuerySchema = z.union([
  responseQueryBaseSchema,
  responseQueryWithQuerySchema,
  responseQueryWithJmesPathMappingsSchema,
]);

// Type exports for TypeScript inference
export type ResponseQueryInput = z.input<typeof responseQuerySchema>;
export type JMESPathMappingRecordInput = z.input<typeof jmesPathMappingRecordSchema>;
export type JMESPathMappingInput = z.input<typeof jmesPathMappingSchema>;

// Validators
export function validateResponseQuery(responseQuery: ResponseQuery): ValidationResult<ResponseQuery> {
  const result = validateWithSchema(responseQuerySchema, responseQuery);
  return result as ValidationResult<ResponseQuery>;
}
