import { z } from "zod";
import { GenericDataPointList } from "@/models/product/generic-interface";
import { DataPointBase } from "@/models/generic";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { dataPointBaseSchema } from "@/sections/shared/data-point-base/data-point-base-schema";

/**
 * Generic Data Point List validation schemas and validators
 */

// Generic Data Point Schema (uses DataPointBase directly)
export const genericDataPointSchema = dataPointBaseSchema;

// Generic Data Point List Schema
export const genericDataPointListSchema = z.object({
  dataPointListElement: z.array(genericDataPointSchema),
});

// Type exports for TypeScript inference
export type GenericDataPointInput = z.input<typeof genericDataPointSchema>;
export type GenericDataPointListInput = z.input<typeof genericDataPointListSchema>;

// Validators
export function validateGenericDataPoint(dataPoint: DataPointBase): ValidationResult<DataPointBase> {
  const result = validateWithSchema(genericDataPointSchema, dataPoint);
  return result as ValidationResult<DataPointBase>;
}

export function validateGenericDataPointList(
  dataPointList: GenericDataPointList
): ValidationResult<GenericDataPointList> {
  const result = validateWithSchema(genericDataPointListSchema, dataPointList);
  return result as ValidationResult<GenericDataPointList>;
}
