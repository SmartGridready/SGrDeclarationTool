import { z } from "zod";
import {
  DATA_DIRECTION_OPTIONS,
  PRESENCE_LEVEL_OPTIONS,
  DATA_TYPE_OPTIONS,
  UNIT_OPTIONS,
} from "./data-point-list-form-options";
import { legibleDescriptionSchema } from "@/sections/functional-profile/legible-description/legible-description-schema";

/**
 * Data Point List validation schemas
 */

const DATA_DIRECTION_VALUES = DATA_DIRECTION_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];
const PRESENCE_LEVEL_VALUES = PRESENCE_LEVEL_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];
const DATA_TYPE_VALUES = DATA_TYPE_OPTIONS.map((o) => o.value) as [
  string,
  ...string[],
];
const UNIT_VALUES = UNIT_OPTIONS.map((o) => o.value) as [string, ...string[]];

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
  dataType: z.enum(DATA_TYPE_VALUES, {
    message: "Data type is required",
  }),
  unit: z.enum(UNIT_VALUES, {
    message: "Unit is required",
  }),
  arrayLength: z.number().int().positive().optional(),
  legibleDescription: z.array(legibleDescriptionSchema).max(4).optional(),
});

// Functional Profile Data Point Schema
export const functionalProfileDataPointSchema = z.object({
  dataPoint: dataPointDescriptionSchema,
});

// Data Point List Schema
export const dataPointListSchema = z.object({
  dataPointListElement: z.array(functionalProfileDataPointSchema),
});

// Type exports
export type DataPointDescriptionInput = z.input<
  typeof dataPointDescriptionSchema
>;
export type FunctionalProfileDataPointInput = z.input<
  typeof functionalProfileDataPointSchema
>;
export type DataPointListInput = z.input<typeof dataPointListSchema>;
