import { z } from "zod";
import {
  FunctionalProfileDataPoint,
  FunctionalProfileDataPointList,
  DATA_DIRECTION_FUNCTIONAL_PROFILE_VALUES,
  PRESENCE_LEVEL_VALUES,
  DATA_TYPE_FUNCTIONAL_PROFILE_EXTENDED_VALUES,
  UNITS_VALUES,
} from "@/models";
import { legibleDescriptionSchema } from "@/sections/shared/legible-description/legible-description-schema";
import { alternativeNamesSchema } from "@/sections/shared/alternative-names/alternative-names-schema";
import { dynamicParameterListSchema } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-schema";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

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
 * Data Point List validation schemas
 */

const DATA_DIRECTION_VALUES = DATA_DIRECTION_FUNCTIONAL_PROFILE_VALUES as unknown as [string, ...string[]];
const PRESENCE_LEVEL_VALUES_ARRAY = PRESENCE_LEVEL_VALUES as unknown as [string, ...string[]];
const DATA_TYPE_VALUES = DATA_TYPE_FUNCTIONAL_PROFILE_EXTENDED_VALUES as unknown as [string, ...string[]];
const UNIT_VALUES = UNITS_VALUES as unknown as [string, ...string[]];

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
  dataPointName: z.string({ message: "Data point name is required" }).min(1, "Data point name cannot be empty"),
  dataDirection: z.enum(DATA_DIRECTION_VALUES, {
    message: "Data direction is required",
  }),
  presenceLevel: z.enum(PRESENCE_LEVEL_VALUES_ARRAY, {
    message: "Presence level is required",
  }),
  dataType: dataTypeFunctionalProfileSchema,
  unit: z.enum(UNIT_VALUES, {
    message: "Unit is required",
  }),
  arrayLength: z.number().int().positive().optional(),
  legibleDescription: z.array(legibleDescriptionSchema).max(4).optional(),
  alternativeNames: alternativeNamesSchema.optional(),
  parameterList: dynamicParameterListSchema.optional(),
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
export function validateDataPoint(dataPoint: FunctionalProfileDataPoint): ValidationResult<FunctionalProfileDataPoint> {
  const result = validateWithSchema(functionalProfileDataPointSchema, dataPoint);
  return result as ValidationResult<FunctionalProfileDataPoint>;
}

export function validateDataPointList(
  dataPointList: FunctionalProfileDataPointList
): ValidationResult<FunctionalProfileDataPointList> {
  const result = validateWithSchema(dataPointListSchema, dataPointList);
  return result as ValidationResult<FunctionalProfileDataPointList>;
}
