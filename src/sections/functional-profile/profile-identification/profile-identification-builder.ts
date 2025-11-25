import { FunctionalProfileIdentification, VersionNumber } from "@/models";
import { ERROR_MESSAGES } from "./profile-identification-error-messages";
import {
  validateFunctionalProfileIdentification,
  validateVersionNumber,
} from "./profile-identification-validator";

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
    const errorMessage =
      firstError?.message ||
      ERROR_MESSAGES.PROFILE_IDENTIFICATION.MISSING_SPECIFICATION_OWNER;
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
    const errorMessage =
      firstError?.message || ERROR_MESSAGES.VERSION_NUMBER.MISSING_PRIMARY;
    throw new Error(errorMessage);
  }

  return {
    primaryVersionNumber: [versionNumber.primaryVersionNumber],
    secondaryVersionNumber: [versionNumber.secondaryVersionNumber],
    subReleaseVersionNumber: [versionNumber.subReleaseVersionNumber],
  };
}
