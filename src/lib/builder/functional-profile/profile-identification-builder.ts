import { FunctionalProfileIdentification, VersionNumber } from "@/lib/models";
import { ERROR_MESSAGES } from "@/lib/constants/error-messages";

/**
 * Builds XML object for functionalProfileIdentification from FunctionalProfileIdentification model
 * @throws Error if required fields are missing
 */
export function buildProfileIdentification(
  identification: FunctionalProfileIdentification
): any {
  // Validate required fields
  if (!identification.specificationOwnerIdentification) {
    throw new Error(
      ERROR_MESSAGES.PROFILE_IDENTIFICATION.MISSING_SPECIFICATION_OWNER
    );
  }
  if (!identification.functionalProfileCategory) {
    throw new Error(ERROR_MESSAGES.PROFILE_IDENTIFICATION.MISSING_CATEGORY);
  }
  if (!identification.functionalProfileType) {
    throw new Error(ERROR_MESSAGES.PROFILE_IDENTIFICATION.MISSING_TYPE);
  }
  if (!identification.levelOfOperation) {
    throw new Error(
      ERROR_MESSAGES.PROFILE_IDENTIFICATION.MISSING_LEVEL_OF_OPERATION
    );
  }
  if (!identification.versionNumber) {
    throw new Error(
      ERROR_MESSAGES.PROFILE_IDENTIFICATION.MISSING_VERSION_NUMBER
    );
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
  // Validate required fields
  if (
    versionNumber.primaryVersionNumber === undefined ||
    versionNumber.primaryVersionNumber === null
  ) {
    throw new Error(ERROR_MESSAGES.VERSION_NUMBER.MISSING_PRIMARY);
  }
  if (
    versionNumber.secondaryVersionNumber === undefined ||
    versionNumber.secondaryVersionNumber === null
  ) {
    throw new Error(ERROR_MESSAGES.VERSION_NUMBER.MISSING_SECONDARY);
  }
  if (
    versionNumber.subReleaseVersionNumber === undefined ||
    versionNumber.subReleaseVersionNumber === null
  ) {
    throw new Error(ERROR_MESSAGES.VERSION_NUMBER.MISSING_SUB_RELEASE);
  }

  return {
    primaryVersionNumber: [versionNumber.primaryVersionNumber],
    secondaryVersionNumber: [versionNumber.secondaryVersionNumber],
    subReleaseVersionNumber: [versionNumber.subReleaseVersionNumber],
  };
}
