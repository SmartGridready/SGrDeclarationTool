import { LegibleDescription } from "@/models";
import {
  ValidationResult,
  validateWithSchema,
} from "@/sections/shared/utils/validation-utils";
import {
  legibleDescriptionSchema,
  legibleDescriptionsSchema,
} from "@/sections/functional-profile/legible-description/legible-description-schema";

/**
 * Validates a single LegibleDescription
 */
export function validateLegibleDescription(
  legibleDescription: LegibleDescription
): ValidationResult<LegibleDescription> {
  const result = validateWithSchema(
    legibleDescriptionSchema,
    legibleDescription
  );
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as LegibleDescription,
    } as ValidationResult<LegibleDescription>;
  }
  return result as ValidationResult<LegibleDescription>;
}

/**
 * Validates an array of LegibleDescription (maxOccurs="4")
 */
export function validateLegibleDescriptionArray(
  legibleDescriptions: LegibleDescription[]
): ValidationResult<LegibleDescription[]> {
  const result = validateWithSchema(
    legibleDescriptionsSchema,
    legibleDescriptions
  );
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as LegibleDescription[],
    } as ValidationResult<LegibleDescription[]>;
  }
  return result as ValidationResult<LegibleDescription[]>;
}
