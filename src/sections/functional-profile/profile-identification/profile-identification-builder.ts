import { FunctionalProfileIdentification, VersionNumber } from "@/models";
import {
  validateFunctionalProfileIdentification,
  validateVersionNumber,
} from "@/sections/functional-profile/profile-identification/profile-identification-validator";

/**
 * Builds XML object for functionalProfileIdentification from FunctionalProfileIdentification model
 * @throws Error if required fields are missing
 */
export function buildProfileIdentification(
  identification: FunctionalProfileIdentification
): any {
  // Validate using validation layer
  const validation = validateFunctionalProfileIdentification(identification);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    // Zod always provides error messages, so this should always be defined
    const errorMessage =
      firstError?.message || "Validation failed for profile identification";
    throw new Error(errorMessage);
  }

  const identificationXml: any = {
    specificationOwnerIdentification: [
      identification.specificationOwnerIdentification,
    ],
    functionalProfileCategory: [identification.functionalProfileCategory],
    functionalProfileType: [identification.functionalProfileType],
    levelOfOperation: [identification.levelOfOperation],
    versionNumber: [buildVersionNumber(identification.versionNumber)],
  };

  return identificationXml;
}

/**
 * Builds XML object for versionNumber from VersionNumber model
 * @throws Error if required fields are missing
 */
function buildVersionNumber(versionNumber: VersionNumber): any {
  // Validate using validation layer
  const validation = validateVersionNumber(versionNumber);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    // Zod always provides error messages, so this should always be defined
    const errorMessage =
      firstError?.message || "Validation failed for version number";
    throw new Error(errorMessage);
  }

  return {
    primaryVersionNumber: [versionNumber.primaryVersionNumber],
    secondaryVersionNumber: [versionNumber.secondaryVersionNumber],
    subReleaseVersionNumber: [versionNumber.subReleaseVersionNumber],
  };
}
