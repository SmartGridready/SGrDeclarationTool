import { AlternativeNames } from "@/models";
import { alternativeNamesSchema } from "@/sections/functional-profile/functional-profile-schema";
import {
  ValidationResult,
  validateWithSchema,
} from "@/sections/shared/validation-utils";

/**
 * Validates AlternativeNames
 */
export function validateAlternativeNames(
  alternativeNames: AlternativeNames
): ValidationResult<AlternativeNames> {
  const result = validateWithSchema(alternativeNamesSchema, alternativeNames);
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as AlternativeNames,
    } as ValidationResult<AlternativeNames>;
  }
  return result as ValidationResult<AlternativeNames>;
}
