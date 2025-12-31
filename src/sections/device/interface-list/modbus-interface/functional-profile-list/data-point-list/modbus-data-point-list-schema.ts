import { z } from "zod";
import { ModbusDataPointList, ModbusDataPoint } from "@/models/product/modbus-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { dataPointBaseSchema } from "@/sections/shared/data-point-base/data-point-base-schema";
import { modbusAttributesSchema } from "@/sections/shared/modbus-attributes/modbus-attributes-schema";
import { modbusDataPointConfigurationSchema } from "./modbus-data-point-configuration/modbus-data-point-configuration-schema";

/**
 * Modbus Data Point List validation schemas and validators
 */

// Modbus Data Point Schema (extends DataPointBase)
export const modbusDataPointSchema = dataPointBaseSchema.extend({
  modbusDataPointConfiguration: modbusDataPointConfigurationSchema.optional(),
  blockCacheIdentification: z.string().optional(),
  modbusAttributes: modbusAttributesSchema.optional(),
});

// Modbus Data Point List Schema
export const modbusDataPointListSchema = z.object({
  dataPointListElement: z.array(modbusDataPointSchema),
});

// Type exports for TypeScript inference
export type ModbusDataPointInput = z.input<typeof modbusDataPointSchema>;
export type ModbusDataPointListInput = z.input<typeof modbusDataPointListSchema>;

// Validators
export function validateModbusDataPoint(dataPoint: ModbusDataPoint): ValidationResult<ModbusDataPoint> {
  const result = validateWithSchema(modbusDataPointSchema, dataPoint);
  return result as ValidationResult<ModbusDataPoint>;
}

export function validateModbusDataPointList(dataPointList: ModbusDataPointList): ValidationResult<ModbusDataPointList> {
  const result = validateWithSchema(modbusDataPointListSchema, dataPointList);
  return result as ValidationResult<ModbusDataPointList>;
}
