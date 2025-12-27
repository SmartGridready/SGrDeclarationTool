import { z } from "zod";
import {
  AccessProtectionEnabled,
  ModbusExceptionCode,
  MODBUS_EXCEPTION_CODE_VALUES,
} from "@/models/product/modbus-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Access Protection validation schemas and validators
 */

// Extract enum values from constants
const MODBUS_EXCEPTION_CODE_VALUES_ARRAY = MODBUS_EXCEPTION_CODE_VALUES as unknown as [
  string,
  ...string[],
];

export const accessProtectionEnabledSchema = z.object({
  modbusExceptionCode: z
    .array(z.enum(MODBUS_EXCEPTION_CODE_VALUES_ARRAY))
    .min(1, "At least one Modbus exception code is required (minOccurs='1')"),
  isEnabled: z.boolean({ message: "isEnabled is required" }),
});

// Type exports for TypeScript inference
export type AccessProtectionEnabledInput = z.input<typeof accessProtectionEnabledSchema>;

// Validators
export function validateAccessProtectionEnabled(
  accessProtection: AccessProtectionEnabled
): ValidationResult<AccessProtectionEnabled> {
  const result = validateWithSchema(accessProtectionEnabledSchema, accessProtection);
  return result as ValidationResult<AccessProtectionEnabled>;
}
