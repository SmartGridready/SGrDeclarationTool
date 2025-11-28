import { z } from "zod";
import { FunctionalProfileDataPoint, FunctionalProfileDataPointList } from "@/models";
import {
  DATA_DIRECTION_OPTIONS,
  PRESENCE_LEVEL_OPTIONS,
  DATA_TYPE_OPTIONS,
  UNIT_OPTIONS,
} from "@/sections/functional-profile/data-point-list/data-point-list-form-options";
import { legibleDescriptionSchema } from "@/sections/functional-profile/legible-description/legible-description-schema";
import { alternativeNamesSchema } from "@/sections/functional-profile/alternative-names/alternative-names-schema";
import { ValidationResult, validateWithSchema } from "@/sections/shared/utils/validation-utils";

/**
 * Generic Attribute List validation schemas (for data points)
 */
const genericAttributeFunctionalProfileSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name cannot be empty"),
});

const genericAttributeListFunctionalProfileSchema = z.object({
  genericAttributeListElement: z.array(genericAttributeFunctionalProfileSchema),
});

/**
 * Parameter List validation schemas (for data points)
 */
// Dynamic Parameter Description Schema (extends LegibleDescription with optional label)
const dynamicParameterDescriptionSchema = legibleDescriptionSchema.extend({
  label: z.string().optional(),
});

// Data Type Product Schema - simplified for validation
// Note: Full validation of enum/bitmap/json structures would require more complex schemas
// This provides basic structure validation
const dataTypeProductSchema = z.union([
  z.object({ boolean: z.object({}) }),
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
  z.object({ enum: z.any() }), // Complex type - validated separately
  z.object({ bitmap: z.any() }), // Complex type - validated separately
  z.object({ json: z.string() }),
]);

// Parameter List Element Schema
const parameterListElementSchema = z.object({
  name: z
    .string({ message: "Parameter name is required" })
    .min(1, "Parameter name cannot be empty"),
  dataType: dataTypeProductSchema,
  defaultValue: z.string().optional(),
  parameterDescription: z.array(dynamicParameterDescriptionSchema).optional(),
});

// Parameter List Schema
export const parameterListSchema = z.object({
  parameterListElement: z.array(parameterListElementSchema).optional(),
});

/**
 * Data Point List validation schemas
 */

const DATA_DIRECTION_VALUES = DATA_DIRECTION_OPTIONS.map((o) => o.value) as [string, ...string[]];
const PRESENCE_LEVEL_VALUES = PRESENCE_LEVEL_OPTIONS.map((o) => o.value) as [string, ...string[]];
const DATA_TYPE_VALUES = DATA_TYPE_OPTIONS.map((o) => o.value) as [string, ...string[]];
const UNIT_VALUES = UNIT_OPTIONS.map((o) => o.value) as [string, ...string[]];

// Data Type Functional Profile Schema - accepts both string (for form) and object (for model)
// The schema accepts either a string representation or the full DataTypeFunctionalProfile object
const dataTypeFunctionalProfileSchema = z.union([
  z.enum(DATA_TYPE_VALUES, {
    message: "Data type is required",
  }),
  // Accept DataTypeFunctionalProfile object structure
  // At least one of these fields must be present
  z
    .object({
      boolean: z.object({}).optional(),
      int8: z.object({}).optional(),
      int16: z.object({}).optional(),
      int32: z.object({}).optional(),
      int64: z.object({}).optional(),
      int8U: z.object({}).optional(),
      int16U: z.object({}).optional(),
      int32U: z.object({}).optional(),
      int64U: z.object({}).optional(),
      float32: z.object({}).optional(),
      float64: z.object({}).optional(),
      dateTime: z.object({}).optional(),
      string: z.object({}).optional(),
      enum: z.any().optional(),
      bitmap: z.any().optional(),
      json: z.any().optional(),
    })
    .refine(
      (obj) => {
        // At least one field must be present
        return (
          "boolean" in obj ||
          "int8" in obj ||
          "int16" in obj ||
          "int32" in obj ||
          "int64" in obj ||
          "int8U" in obj ||
          "int16U" in obj ||
          "int32U" in obj ||
          "int64U" in obj ||
          "float32" in obj ||
          "float64" in obj ||
          "dateTime" in obj ||
          "string" in obj ||
          "enum" in obj ||
          "bitmap" in obj ||
          "json" in obj
        );
      },
      {
        message: "Data type must have at least one type field",
      }
    ),
]);

// Data Point Description Schema
export const dataPointDescriptionSchema = z.object({
  dataPointName: z
    .string({ message: "Data point name is required" })
    .min(1, "Data point name cannot be empty"),
  dataDirection: z.enum(DATA_DIRECTION_VALUES, {
    message: "Data direction is required",
  }),
  presenceLevel: z.enum(PRESENCE_LEVEL_VALUES, {
    message: "Presence level is required",
  }),
  dataType: dataTypeFunctionalProfileSchema,
  unit: z.enum(UNIT_VALUES, {
    message: "Unit is required",
  }),
  arrayLength: z.number().int().positive().optional(),
  legibleDescription: z.array(legibleDescriptionSchema).max(4).optional(),
  alternativeNames: alternativeNamesSchema.optional(),
  parameterList: parameterListSchema.optional(),
});

// Functional Profile Data Point Schema
export const functionalProfileDataPointSchema = z.object({
  dataPoint: dataPointDescriptionSchema,
  genericAttributeList: genericAttributeListFunctionalProfileSchema.optional(),
});

// Data Point List Schema
export const dataPointListSchema = z.object({
  dataPointListElement: z.array(functionalProfileDataPointSchema),
});

// Type exports
export type DataPointDescriptionInput = z.input<typeof dataPointDescriptionSchema>;
export type FunctionalProfileDataPointInput = z.input<typeof functionalProfileDataPointSchema>;
export type DataPointListInput = z.input<typeof dataPointListSchema>;

// Validators
export function validateDataPoint(
  dataPoint: FunctionalProfileDataPoint
): ValidationResult<FunctionalProfileDataPoint> {
  const result = validateWithSchema(functionalProfileDataPointSchema, dataPoint);
  return result as ValidationResult<FunctionalProfileDataPoint>;
}

export function validateDataPointList(
  dataPointList: FunctionalProfileDataPointList
): ValidationResult<FunctionalProfileDataPointList> {
  const result = validateWithSchema(dataPointListSchema, dataPointList);
  return result as ValidationResult<FunctionalProfileDataPointList>;
}
