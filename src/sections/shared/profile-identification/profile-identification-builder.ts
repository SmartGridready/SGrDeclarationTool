import { FunctionalProfileIdentification, VersionNumber } from "@/models";
import {
  validateFunctionalProfileIdentification,
  validateVersionNumber,
} from "@/sections/shared/profile-identification/profile-identification-schema";
import { wrapInArray } from "@/utils/builder-utils";

/**
 * Builds XML object for functionalProfileIdentification from FunctionalProfileIdentification model
 * @throws Error if required fields are missing
 */
export function buildProfileIdentification(
  identification: FunctionalProfileIdentification
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateFunctionalProfileIdentification(identification);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    // Zod always provides error messages, so this should always be defined
    const errorMessage = firstError?.message || "Validation failed for profile identification";
    throw new Error(errorMessage);
  }

  const identificationXml: Record<string, unknown> = {
    specificationOwnerIdentification: wrapInArray(identification.specificationOwnerIdentification),
    functionalProfileCategory: wrapInArray(identification.functionalProfileCategory),
    functionalProfileType: wrapInArray(identification.functionalProfileType),
    levelOfOperation: wrapInArray(identification.levelOfOperation),
    versionNumber: wrapInArray(buildVersionNumber(identification.versionNumber)),
  };

  return identificationXml;
}

/**
 * Builds XML object for versionNumber from VersionNumber model
 * @throws Error if required fields are missing
 */
function buildVersionNumber(versionNumber: VersionNumber): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateVersionNumber(versionNumber);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    // Zod always provides error messages, so this should always be defined
    const errorMessage = firstError?.message || "Validation failed for version number";
    throw new Error(errorMessage);
  }

  return {
    primaryVersionNumber: wrapInArray(versionNumber.primaryVersionNumber),
    secondaryVersionNumber: wrapInArray(versionNumber.secondaryVersionNumber),
    subReleaseVersionNumber: wrapInArray(versionNumber.subReleaseVersionNumber),
  };
}
