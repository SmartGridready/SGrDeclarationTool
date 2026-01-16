import { z } from "zod";
import { MessagingInterfaceDescription, MESSAGING_PLATFORM_TYPE_VALUES } from "@/models/product/messaging-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * MessagingInterfaceDescription validation schemas and validators
 */

// Extract enum values from constants
const MESSAGING_PLATFORM_TYPE_VALUES_ARRAY = MESSAGING_PLATFORM_TYPE_VALUES as unknown as [string, ...string[]];

// BooleanParameter pattern: \{\{.+\}\}|true|false
const booleanParameterPattern = /^(\{\{.+\}\}|true|false)$/;

// MessageBrokerListElement schema
// Note: tls and tlsVerifyCertificate are BooleanParameter (string type that can be "true", "false", or variable like "{{var}}")
export const messageBrokerListElementSchema = z.object({
  host: z.string().min(1, "Host is required"),
  port: z.string().min(1, "Port is required"),
  tls: z.string().regex(booleanParameterPattern, "Must be 'true', 'false', or a variable (e.g., {{tls}})").optional(),
  tlsVerifyCertificate: z
    .string()
    .regex(booleanParameterPattern, "Must be 'true', 'false', or a variable (e.g., {{verify}})")
    .optional(),
});

// MessageBrokerList schema
export const messageBrokerListSchema = z.object({
  messageBrokerListElement: z.array(messageBrokerListElementSchema).min(1, "At least one message broker is required"),
});

// Basic Authentication schema
const basicAuthenticationSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Client Certificate Authentication schema
const clientCertificateAuthenticationSchema = z.object({
  keystorePath: z.string().min(1, "Keystore path is required"),
  keystorePassword: z.string().min(1, "Keystore password is required"),
  truststorePath: z.string().min(1, "Truststore path is required"),
  truststorePassword: z.string().min(1, "Truststore password is required"),
});

// MessageBrokerAuthentication schema (union)
const messageBrokerAuthenticationSchema = z.union([
  z.object({ basicAuthentication: basicAuthenticationSchema }),
  z.object({ clientCertificateAuthentication: clientCertificateAuthenticationSchema }),
]);

// MessagingInterfaceDescription schema
export const messagingInterfaceDescriptionSchema = z.object({
  platform: z.enum(MESSAGING_PLATFORM_TYPE_VALUES_ARRAY, {
    message: "Platform is required",
  }),
  messageBrokerList: messageBrokerListSchema,
  clientId: z.string().optional(),
  messageBrokerAuthentication: messageBrokerAuthenticationSchema.optional(),
});

// Type exports for TypeScript inference
export type MessagingInterfaceDescriptionInput = z.input<typeof messagingInterfaceDescriptionSchema>;

// Validators
export function validateMessagingInterfaceDescription(
  description: MessagingInterfaceDescription
): ValidationResult<MessagingInterfaceDescription> {
  const result = validateWithSchema(messagingInterfaceDescriptionSchema, description);
  return result as ValidationResult<MessagingInterfaceDescription>;
}
