import { z } from "zod";
import { ModbusAttributes, MODBUS_LAYER6_DEVIATION_VALUES } from "@/models/product/modbus-types";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { scalingFactorSchema } from "./scaling-factor/scaling-factor-schema";
import { accessProtectionEnabledSchema } from "./access-protection/access-protection-schema";

/**
 * Modbus Attributes validation schemas and validators
 */

// Extract enum values from constants
const MODBUS_LAYER6_DEVIATION_VALUES_ARRAY = MODBUS_LAYER6_DEVIATION_VALUES as unknown as [string, ...string[]];

export const modbusAttributesSchema = z.object({
  scalingFactor: scalingFactorSchema.optional(),
  stepByIncrement: z.number().optional(),
  sunssf: z.number().optional(),
  pollingLatencyMs: z.number().int().positive().optional(),
  accessProtection: accessProtectionEnabledSchema.optional(),
  layer6Deviation: z.enum(MODBUS_LAYER6_DEVIATION_VALUES_ARRAY).optional(),
});

// Type exports for TypeScript inference
export type ModbusAttributesInput = z.input<typeof modbusAttributesSchema>;

// Validators
export function validateModbusAttributes(attributes: ModbusAttributes): ValidationResult<ModbusAttributes> {
  const result = validateWithSchema(modbusAttributesSchema, attributes);
  return result as ValidationResult<ModbusAttributes>;
}
