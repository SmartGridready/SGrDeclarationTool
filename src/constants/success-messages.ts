/**
 * Centralized success messages for user-facing success notifications
 * All success messages displayed to users should be defined here
 */

export const SUCCESS_MESSAGES = {
  // File Import/Export Success
  FILE_IMPORT: {
    SUCCESS: "File imported successfully",
    LOADED: (fileName: string) => `${fileName} has been loaded.`,
  },
  FILE_EXPORT: {
    BUILD_SUCCESS: "Building file successful",
    DOWNLOAD_READY: (fileName: string) => `${fileName} can be downloaded now.`,
  },
} as const;
