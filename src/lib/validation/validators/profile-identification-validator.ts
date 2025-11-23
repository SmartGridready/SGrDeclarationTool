import { FunctionalProfileIdentification, VersionNumber } from "@/lib/models";
import {
  functionalProfileIdentificationSchema,
  versionNumberSchema,
} from "../schemas";
import {
  ValidationResult,
  validateWithSchema,
} from "../../utils/validation-utils";

/**
 * Validates FunctionalProfileIdentification
 */
export function validateFunctionalProfileIdentification(
  identification: FunctionalProfileIdentification
): ValidationResult<FunctionalProfileIdentification> {
  const result = validateWithSchema(
    functionalProfileIdentificationSchema,
    identification
  );
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as FunctionalProfileIdentification,
    } as ValidationResult<FunctionalProfileIdentification>;
  }
  return result as ValidationResult<FunctionalProfileIdentification>;
}

/**
 * Validates VersionNumber
 */
export function validateVersionNumber(
  versionNumber: VersionNumber
): ValidationResult<VersionNumber> {
  const result = validateWithSchema(versionNumberSchema, versionNumber);
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as VersionNumber,
    } as ValidationResult<VersionNumber>;
  }
  return result as ValidationResult<VersionNumber>;
}
