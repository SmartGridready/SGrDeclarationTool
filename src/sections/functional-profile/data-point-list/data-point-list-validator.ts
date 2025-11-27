import {
  FunctionalProfileDataPoint,
  FunctionalProfileDataPointList,
} from "@/models";
import {
  ValidationResult,
  validateWithSchema,
} from "@/sections/shared/utils/validation-utils";
import {
  functionalProfileDataPointSchema,
  dataPointListSchema,
} from "@/sections/functional-profile/data-point-list/data-point-list-schema";

/**
 * Validates a single FunctionalProfileDataPoint
 */
export function validateDataPoint(
  dataPoint: FunctionalProfileDataPoint
): ValidationResult<FunctionalProfileDataPoint> {
  const result = validateWithSchema(
    functionalProfileDataPointSchema,
    dataPoint
  );
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as FunctionalProfileDataPoint,
    } as ValidationResult<FunctionalProfileDataPoint>;
  }
  return result as ValidationResult<FunctionalProfileDataPoint>;
}

/**
 * Validates a FunctionalProfileDataPointList
 */
export function validateDataPointList(
  dataPointList: FunctionalProfileDataPointList
): ValidationResult<FunctionalProfileDataPointList> {
  const result = validateWithSchema(dataPointListSchema, dataPointList);
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as FunctionalProfileDataPointList,
    } as ValidationResult<FunctionalProfileDataPointList>;
  }
  return result as ValidationResult<FunctionalProfileDataPointList>;
}
