import { z } from "zod";
import {
  MessagingDataPointConfiguration,
  MESSAGING_DATA_TYPE_VALUES,
} from "@/models/product/messaging-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { responseQuerySchema } from "@/sections/shared/response-query/response-query-schema";
import { messagingValueMappingSchema } from "@/sections/shared/messaging-value-mapping/messaging-value-mapping-schema";

/**
 * MessagingDataPointConfiguration validation schemas and validators
 */

// Extract enum values from constants
const MESSAGING_DATA_TYPE_VALUES_ARRAY = MESSAGING_DATA_TYPE_VALUES as unknown as [
  string,
  ...string[],
];

// MessagingDataType schema (union of simple types)
const messagingDataTypeSchema = z.union([
  z.object({ number: z.object({}) }),
  z.object({ string: z.object({}) }),
  z.object({ JSON_array: z.object({}) }),
  z.object({ JSON_object: z.object({}) }),
]);

// PlaintextFilterType schema
const plaintextFilterTypeSchema = z.object({
  matchesRegex: z.string().min(1, "Matches regex is required"),
});

// JMESPathFilterType schema
const jmespathFilterTypeSchema = z.object({
  query: z.string().min(1, "Query is required"),
  matchesRegex: z.string().min(1, "Matches regex is required"),
});

// XPathFilterType schema
const xpathFilterTypeSchema = z.object({
  query: z.string().min(1, "Query is required"),
  matchesRegex: z.string().min(1, "Matches regex is required"),
});

// RegexFilterType schema
const regexFilterTypeSchema = z.object({
  query: z.string().min(1, "Query is required"),
  matchesRegex: z.string().min(1, "Matches regex is required"),
});

// JSONataFilterType schema
const jsonataFilterTypeSchema = z.object({
  query: z.string().min(1, "Query is required"),
  matchesRegex: z.string().min(1, "Matches regex is required"),
});

// MessageFilter schema (union)
const messageFilterSchema = z.union([
  z.object({ plaintextFilter: plaintextFilterTypeSchema }),
  z.object({ jmespathFilter: jmespathFilterTypeSchema }),
  z.object({ xpathFilter: xpathFilterTypeSchema }),
  z.object({ regexFilter: regexFilterTypeSchema }),
  z.object({ jsonataFilter: jsonataFilterTypeSchema }),
]);

// OutMessage schema
export const outMessageSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  template: z.string().min(1, "Template is required"),
  templateQuery: responseQuerySchema.optional(),
  valueMapping: messagingValueMappingSchema.optional(),
});

// InMessage schema
export const inMessageSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  filter: messageFilterSchema.optional(),
  responseQuery: responseQuerySchema.optional(),
  valueMapping: messagingValueMappingSchema.optional(),
});

// MessagingDataPointConfiguration schema
export const messagingDataPointConfigurationSchema = z.object({
  messagingDataType: messagingDataTypeSchema,
  readCmdMessage: outMessageSchema.optional(),
  writeCmdMessage: outMessageSchema.optional(),
  inMessage: inMessageSchema.optional(),
});

// Type exports for TypeScript inference
export type MessagingDataPointConfigurationInput = z.input<
  typeof messagingDataPointConfigurationSchema
>;
export type OutMessageInput = z.input<typeof outMessageSchema>;
export type InMessageInput = z.input<typeof inMessageSchema>;

// Validators
export function validateMessagingDataPointConfiguration(
  config: MessagingDataPointConfiguration
): ValidationResult<MessagingDataPointConfiguration> {
  const result = validateWithSchema(messagingDataPointConfigurationSchema, config);
  return result as ValidationResult<MessagingDataPointConfiguration>;
}
