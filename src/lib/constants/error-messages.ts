/**
 * Centralized error messages for user-facing errors
 * All error messages displayed to users should be defined here
 */

export const ERROR_MESSAGES = {
  FILE_IMPORT: {
    FAILED: "Failed to import file",
    UNKNOWN_ERROR: "An unknown error occurred while processing the file.",
    READ_FAILED: "Failed to read file as text",
    READ_ERROR: (fileName: string) => `Error reading file: ${fileName}`,
  },
  FILE_EXPORT: {
    FAILED: "Export failed",
    NO_DATA: "No data to export",
    UNKNOWN_ERROR: "An unknown error occurred while exporting.",
    PROFILE_REQUIRED: "Please load or create a profile first.",
  },
  XML_PARSE: {
    FAILED: (message: string) => `Failed to parse XML: ${message}`,
    INVALID_ROOT: "Invalid XML: Root element must be 'FunctionalProfileFrame'",
    MISSING_IDENTIFICATION:
      "Invalid XML: 'functionalProfile.functionalProfileIdentification' is required",
  },
  XML_BUILD: {
    FAILED: (message: string) => `Failed to build XML: ${message}`,
    FRAME_REQUIRED: "FunctionalProfileFrame is required",
    MISSING_IDENTIFICATION:
      "FunctionalProfileFrame must have 'functionalProfile.functionalProfileIdentification'",
  },
  RELEASE_NOTES: {
    MISSING_STATE: "ReleaseNotes must have a 'state' field",
  },
  CHANGE_LOG: {
    MISSING_VERSION: "ChangeLogEntry must have a 'version' field",
    MISSING_DATE: "ChangeLogEntry must have a 'date' field",
    MISSING_AUTHOR: "ChangeLogEntry must have an 'author' field",
    MISSING_COMMENT: "ChangeLogEntry must have a 'comment' field",
  },
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
