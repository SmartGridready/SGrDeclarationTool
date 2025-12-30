import { z } from "zod";
import { ModbusDataType } from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Modbus Data Type validation schemas
 * Note: Full validation of enum/bitmap structures would require more complex schemas
 * This provides basic structure validation
 */

// ModbusBoolean can be empty, or have trueValue, or have falseValue
const modbusBooleanSchema = z.union([
  z.object({}), // Empty type
  z.object({ trueValue: z.number() }),
  z.object({ falseValue: z.number() }),
]);

// Enum schema (used in Modbus)
const enumSchema = z.object({
  enumEntry: z.array(
    z.object({
      literal: z.string(),
      ordinal: z.number(),
      description: z.string().optional(),
    })
  ),
  hexMask: z.string().optional(),
});

// Bitmap schema (used in Modbus - same as BitmapProduct)
const bitmapSchema = z.object({
  bitmapEntry: z.array(
    z.object({
      literal: z.string(),
      hexMask: z.string(),
      description: z.string().optional(),
    })
  ),
});

export const modbusDataTypeSchema = z.union([
  z.object({ boolean: modbusBooleanSchema }),
  z.object({ int8: z.object({}) }),
  z.object({ int16: z.object({}) }),
  z.object({ int32: z.object({}) }),
  z.object({ int64: z.object({}) }),
  z.object({ int8U: z.object({}) }),
  z.object({ int16U: z.object({}) }),
  z.object({ int32U: z.object({}) }),
  z.object({ int64U: z.object({}) }),
  z.object({ float32: z.object({}) }),
  z.object({ float64: z.object({}) }),
  z.object({ dateTime: z.object({}) }),
  z.object({ string: z.object({}) }),
  z.object({ enum: enumSchema }),
  z.object({ bitmap: bitmapSchema }),
]);

// Type exports for TypeScript inference
export type ModbusDataTypeInput = z.input<typeof modbusDataTypeSchema>;

// Validators
export function validateModbusDataType(dataType: ModbusDataType): ValidationResult<ModbusDataType> {
  const result = validateWithSchema(modbusDataTypeSchema, dataType);
  return result as ValidationResult<ModbusDataType>;
}
