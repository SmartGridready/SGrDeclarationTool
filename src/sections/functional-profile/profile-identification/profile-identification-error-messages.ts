/**
 * Error messages specific to Profile Identification functionality
 */

export const ERROR_MESSAGES = {
  PROFILE_IDENTIFICATION: {
    MISSING_SPECIFICATION_OWNER:
      "FunctionalProfileIdentification must have a 'specificationOwnerIdentification' field",
    MISSING_CATEGORY:
      "FunctionalProfileIdentification must have a 'functionalProfileCategory' field",
    MISSING_TYPE:
      "FunctionalProfileIdentification must have a 'functionalProfileType' field",
    MISSING_LEVEL_OF_OPERATION:
      "FunctionalProfileIdentification must have a 'levelOfOperation' field",
    MISSING_VERSION_NUMBER:
      "FunctionalProfileIdentification must have a 'versionNumber' field",
  },
  VERSION_NUMBER: {
    MISSING_PRIMARY: "VersionNumber must have a 'primaryVersionNumber' field",
    MISSING_SECONDARY:
      "VersionNumber must have a 'secondaryVersionNumber' field",
    MISSING_SUB_RELEASE:
      "VersionNumber must have a 'subReleaseVersionNumber' field",
  },
} as const;
