/**
 * General error messages for file operations and XML processing
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
    INVALID_ROOT_DEVICE: "Invalid XML: Root element must be 'DeviceFrame'",
    INVALID_ROOT_FP: "Invalid XML: Root element must be 'FunctionalProfileFrame'",
  },
  XML_BUILD: {
    FAILED: (message: string) => `Failed to build XML: ${message}`,
    FRAME_REQUIRED_DEVICE: "DeviceFrame is required",
    FRAME_REQUIRED_FP: "FunctionalProfileFrame is required",
  },
} as const;
