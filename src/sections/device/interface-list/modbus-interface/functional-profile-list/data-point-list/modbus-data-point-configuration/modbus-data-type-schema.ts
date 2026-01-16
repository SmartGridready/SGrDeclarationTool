import { z } from "zod";
import { ModbusDataType } from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Modbus Data Type validation schemas
 * Note: Full validation of enum/bitmap structures would require more complex schemas
 * This provides basic structure validation
 */

// ModbusBoolean can be empty, or have trueValue, or have falseValue
// Note: trueValue and falseValue are type="unsignedShort" in XSD (0-65535)
const modbusBooleanSchema = z.union([
  z.object({}), // Empty type
  z.object({
    trueValue: z
      .number()
      .int("True value must be an integer")
      .min(0, "True value must be at least 0")
      .max(65535, "True value cannot exceed 65535"),
  }),
  z.object({
    falseValue: z
      .number()
      .int("False value must be an integer")
      .min(0, "False value must be at least 0")
      .max(65535, "False value cannot exceed 65535"),
  }),
]);

// Enum schema (used in Modbus)
// enumEntry has maxOccurs="unbounded" with no minOccurs (defaults to 1), so at least one entry is required
const enumSchema = z.object({
  enumEntry: z
    .array(
      z.object({
        literal: z.string().min(1, "Literal is required"),
        ordinal: z.number().int("Ordinal must be an integer"), // Required in EnumEntry (not optional like EnumEntryProductRecord)
        description: z.string().optional(),
      })
    )
    .min(1, "At least one enum entry is required"),
  hexMask: z.string().optional(),
});

// Bitmap schema (used in Modbus - same as BitmapProduct)
// bitmapEntry has maxOccurs="unbounded" with no minOccurs (defaults to 1), so at least one entry is required
const bitmapSchema = z.object({
  bitmapEntry: z
    .array(
      z.object({
        literal: z.string().min(1, "Literal is required"),
        hexMask: z.string().min(1, "Hex mask is required"),
        description: z.string().optional(),
      })
    )
    .min(1, "At least one bitmap entry is required"),
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
