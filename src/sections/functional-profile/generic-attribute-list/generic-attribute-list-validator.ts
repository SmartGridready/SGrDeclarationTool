import {
  GenericAttributeFunctionalProfile,
  GenericAttributeListFunctionalProfile,
} from "@/models";
import {
  ValidationResult,
  validateWithSchema,
} from "@/sections/shared/utils/validation-utils";
import {
  genericAttributeFunctionalProfileSchema,
  genericAttributeListFunctionalProfileSchema,
} from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-schema";

/**
 * Validates a single GenericAttributeFunctionalProfile
 */
export function validateGenericAttribute(
  attribute: GenericAttributeFunctionalProfile
): ValidationResult<GenericAttributeFunctionalProfile> {
  const result = validateWithSchema(
    genericAttributeFunctionalProfileSchema,
    attribute
  );
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as GenericAttributeFunctionalProfile,
    } as ValidationResult<GenericAttributeFunctionalProfile>;
  }
  return result as ValidationResult<GenericAttributeFunctionalProfile>;
}

/**
 * Validates a GenericAttributeListFunctionalProfile
 */
export function validateGenericAttributeList(
  attributeList: GenericAttributeListFunctionalProfile
): ValidationResult<GenericAttributeListFunctionalProfile> {
  const result = validateWithSchema(
    genericAttributeListFunctionalProfileSchema,
    attributeList
  );
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as GenericAttributeListFunctionalProfile,
    } as ValidationResult<GenericAttributeListFunctionalProfile>;
  }
  return result as ValidationResult<GenericAttributeListFunctionalProfile>;
}
