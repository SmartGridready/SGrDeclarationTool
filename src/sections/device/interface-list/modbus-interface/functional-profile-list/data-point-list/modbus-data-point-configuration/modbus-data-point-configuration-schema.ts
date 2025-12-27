import { z } from "zod";
import {
  ModbusDataPointConfiguration,
  RegisterType,
  REGISTER_TYPE_VALUES,
  BitRank,
} from "@/models/product/modbus-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { modbusDataTypeSchema } from "./modbus-data-type-schema";

/**
 * Modbus Data Point Configuration validation schemas and validators
 */

// Extract enum values from constants
const REGISTER_TYPE_VALUES_ARRAY = REGISTER_TYPE_VALUES as unknown as [string, ...string[]];

export const modbusDataPointConfigurationSchema = z.object({
  modbusDataType: modbusDataTypeSchema,
  address: z.number().int().nonnegative({ message: "Address must be non-negative" }),
  bitRank: z.number().int().min(0).max(15).optional(),
  registerType: z.enum(REGISTER_TYPE_VALUES_ARRAY, {
    message: "Register type is required",
  }),
  numberOfRegisters: z.number().int().positive({ message: "Number of registers must be positive" }),
});

// Type exports for TypeScript inference
export type ModbusDataPointConfigurationInput = z.input<typeof modbusDataPointConfigurationSchema>;

// Validators
export function validateModbusDataPointConfiguration(
  configuration: ModbusDataPointConfiguration
): ValidationResult<ModbusDataPointConfiguration> {
  const result = validateWithSchema(modbusDataPointConfigurationSchema, configuration);
  return result as ValidationResult<ModbusDataPointConfiguration>;
}
