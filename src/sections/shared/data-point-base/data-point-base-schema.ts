import { z } from "zod";
import { DataPointBase, DataPointDescription, DATA_DIRECTION_PRODUCT_VALUES, UNITS_VALUES } from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { alternativeNamesSchema } from "@/sections/shared/alternative-names/alternative-names-schema";
import { legibleDescriptionSchema } from "@/sections/shared/legible-description/legible-description-schema";
import { genericAttributeListProductSchema } from "@/sections/shared/generic-attribute-list-product/generic-attribute-list-product-schema";
import { dynamicParameterListSchema } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-schema";
import { dataTypeProductSchema } from "@/sections/shared/data-type-product/data-type-product-schema";

/**
 * Data Point Base validation schemas and validators
 */

// Extract enum values from constants
const DATA_DIRECTION_PRODUCT_VALUES_ARRAY = DATA_DIRECTION_PRODUCT_VALUES as unknown as [string, ...string[]];
const UNITS_VALUES_ARRAY = UNITS_VALUES as unknown as [string, ...string[]];

// Data Point Description Schema
export const dataPointDescriptionSchema = z.object({
  dataPointName: z.string({ message: "Data point name is required" }).min(1, "Data point name cannot be empty"),
  dataDirection: z.enum(DATA_DIRECTION_PRODUCT_VALUES_ARRAY, {
    message: "Data direction is required",
  }),
  dataType: dataTypeProductSchema,
  value: z.string().optional(),
  unit: z.enum(UNITS_VALUES_ARRAY, {
    message: "Unit is required",
  }),
  arrayLength: z.number().int().positive().optional(),
  minimumValue: z.number().optional(),
  maximumValue: z.number().optional(),
  unitConversionMultiplicator: z.number().optional(),
  parameterList: dynamicParameterListSchema.optional(),
  alternativeNames: alternativeNamesSchema.optional(),
  legibleDescription: z.array(legibleDescriptionSchema).max(4, "Maximum 4 legible descriptions allowed").optional(),
  programmerHints: z.array(legibleDescriptionSchema).max(4, "Maximum 4 programmer hints allowed").optional(),
});

// Data Point Base Schema
export const dataPointBaseSchema = z.object({
  dataPoint: dataPointDescriptionSchema,
  genericAttributeList: genericAttributeListProductSchema.optional(),
});

// Type exports for TypeScript inference
export type DataPointDescriptionInput = z.input<typeof dataPointDescriptionSchema>;
export type DataPointBaseInput = z.input<typeof dataPointBaseSchema>;

// Validators
export function validateDataPointDescription(
  description: DataPointDescription
): ValidationResult<DataPointDescription> {
  const result = validateWithSchema(dataPointDescriptionSchema, description);
  return result as ValidationResult<DataPointDescription>;
}

export function validateDataPointBase(dataPoint: DataPointBase): ValidationResult<DataPointBase> {
  const result = validateWithSchema(dataPointBaseSchema, dataPoint);
  return result as ValidationResult<DataPointBase>;
}
