import { z } from "zod";
import {
  SerialInterfaceCapability,
  BAUD_RATE_VALUES,
  BYTE_LENGTH_VALUES,
  PARITY_VALUES,
  STOP_BIT_LENGTH_VALUES,
} from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Serial Interface Capability validation schemas and validators
 */

// Extract enum values from constants
const BAUD_RATE_VALUES_ARRAY = BAUD_RATE_VALUES as unknown as [string, ...string[]];
const BYTE_LENGTH_VALUES_ARRAY = BYTE_LENGTH_VALUES as unknown as [string, ...string[]];
const PARITY_VALUES_ARRAY = PARITY_VALUES as unknown as [string, ...string[]];
const STOP_BIT_LENGTH_VALUES_ARRAY = STOP_BIT_LENGTH_VALUES as unknown as [string, ...string[]];

// Note: All arrays have maxOccurs="unbounded" with no minOccurs (defaults to 1) in XSD
export const serialInterfaceCapabilitySchema = z.object({
  baudRatesSupported: z.array(z.enum(BAUD_RATE_VALUES_ARRAY)).min(1, "At least one baud rate is required"),
  byteLenSupported: z.array(z.enum(BYTE_LENGTH_VALUES_ARRAY)).min(1, "At least one byte length is required"),
  paritySupported: z.array(z.enum(PARITY_VALUES_ARRAY)).min(1, "At least one parity is required"),
  stopBitLenSupported: z.array(z.enum(STOP_BIT_LENGTH_VALUES_ARRAY)).min(1, "At least one stop bit length is required"),
});

// Type exports for TypeScript inference
export type SerialInterfaceCapabilityInput = z.input<typeof serialInterfaceCapabilitySchema>;

// Validators
export function validateSerialInterfaceCapability(
  capability: SerialInterfaceCapability
): ValidationResult<SerialInterfaceCapability> {
  const result = validateWithSchema(serialInterfaceCapabilitySchema, capability);
  return result as ValidationResult<SerialInterfaceCapability>;
}
