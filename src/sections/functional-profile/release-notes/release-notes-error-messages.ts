/**
 * Error messages specific to Release Notes functionality
 */

export const ERROR_MESSAGES = {
  RELEASE_NOTES: {
    MISSING_STATE: "ReleaseNotes must have a 'state' field",
  },
  CHANGE_LOG: {
    MISSING_VERSION: "ChangeLogEntry must have a 'version' field",
    MISSING_DATE: "ChangeLogEntry must have a 'date' field",
    MISSING_AUTHOR: "ChangeLogEntry must have an 'author' field",
    MISSING_COMMENT: "ChangeLogEntry must have a 'comment' field",
  },
} as const;
