import { z } from "zod";
import { RestApiDataPointList, RestApiDataPoint } from "@/models/product/rest-api-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { dataPointBaseSchema } from "@/sections/shared/data-point-base/data-point-base-schema";
import { restApiDataPointConfigurationSchema } from "./rest-api-data-point-configuration/rest-api-data-point-configuration-schema";

/**
 * REST API Data Point List validation schemas and validators
 */

// REST API Data Point Schema (extends DataPointBase)
export const restApiDataPointSchema = dataPointBaseSchema.extend({
  restApiDataPointConfiguration: restApiDataPointConfigurationSchema.optional(),
});

// REST API Data Point List Schema
export const restApiDataPointListSchema = z.object({
  dataPointListElement: z.array(restApiDataPointSchema).min(1, "At least one data point is required"),
});

// Type exports for TypeScript inference
export type RestApiDataPointInput = z.input<typeof restApiDataPointSchema>;
export type RestApiDataPointListInput = z.input<typeof restApiDataPointListSchema>;

// Validators
export function validateRestApiDataPoint(dataPoint: RestApiDataPoint): ValidationResult<RestApiDataPoint> {
  const result = validateWithSchema(restApiDataPointSchema, dataPoint);
  return result as ValidationResult<RestApiDataPoint>;
}

export function validateRestApiDataPointList(
  dataPointList: RestApiDataPointList
): ValidationResult<RestApiDataPointList> {
  const result = validateWithSchema(restApiDataPointListSchema, dataPointList);
  return result as ValidationResult<RestApiDataPointList>;
}
