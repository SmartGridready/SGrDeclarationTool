import { useCallback } from "react";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { SUCCESS_MESSAGES } from "@/constants/success-messages";
import { useValidationStore } from "@/sections/shared/validation-store";
import { ValidationResult } from "@/utils/validation-utils";

/**
 * Generic file export hook for XML files
 * @template T - The type of the data to export (e.g., FunctionalProfileFrame)
 * @param options - Configuration options
 * @param options.builder - Function to build the XML string from type T
 * @param options.data - The data to export
 * @param options.filename - The filename for the exported file (default: "export.xml")
 * @param options.errorMessage - Custom error message when data is missing
 * @param options.validator - Optional validator function to validate data before export
 * @returns Object with exportFile function
 */
export function useFileExport<T>({
  builder,
  data,
  filename = "export.xml",
  errorMessage = ERROR_MESSAGES.FILE_EXPORT.NO_DATA,
  validator,
}: {
  builder: (data: T) => Promise<string>;
  data: T | null | undefined;
  filename?: string;
  errorMessage?: string;
  validator?: (data: T) => ValidationResult<T>;
}) {
  const setValidationAttempted = useValidationStore((state) => state.setValidationAttempted);

  /**
   * Gets the first field error message from validation result
   * Returns a user-friendly message showing which field is missing/invalid
   */
  const getFirstFieldError = (validation: ValidationResult<unknown>): string | undefined => {
    if (validation.success) return undefined;

    // Try to get the first field error from fieldErrors
    if (validation.fieldErrors) {
      const firstFieldPath = Object.keys(validation.fieldErrors)[0];
      if (firstFieldPath) {
        const firstError = validation.fieldErrors[firstFieldPath]?.[0];
        if (firstError) {
          return firstError;
        }
      }
    }

    // Fallback to first error from issues
    if (validation.errors?.issues?.[0]) {
      return validation.errors.issues[0].message;
    }

    return undefined;
  };

  const exportFile = useCallback(async () => {
    if (!data) {
      toast.error(ERROR_MESSAGES.FILE_EXPORT.FAILED, {
        description: errorMessage,
      });
      return;
    }

    // Validate before exporting - this triggers validation error display
    if (validator) {
      const validation = validator(data);

      // Mark validation as attempted so errors will be displayed
      setValidationAttempted(true);

      if (!validation.success) {
        const firstFieldError = getFirstFieldError(validation);
        const errorMessageText =
          firstFieldError || "Please fix validation errors before exporting.";

        toast.error(ERROR_MESSAGES.FILE_EXPORT.FAILED, {
          description: errorMessageText,
          duration: 5000,
        });
        return;
      }
    }

    const loadingToastId = toast.loading("Exporting file...", {
      description: `Generating ${filename}`,
    });

    try {
      const xmlString = await builder(data);

      // Create a blob and download it
      const blob = new Blob([xmlString], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Update the loading toast to success (this replaces it automatically)
      toast.success(SUCCESS_MESSAGES.FILE_EXPORT.BUILD_SUCCESS, {
        id: loadingToastId,
        description: SUCCESS_MESSAGES.FILE_EXPORT.DOWNLOAD_READY(filename),
      });
    } catch (error) {
      const errorMessageText =
        error instanceof Error ? error.message : ERROR_MESSAGES.FILE_EXPORT.UNKNOWN_ERROR;

      // Update the loading toast to error (this replaces it automatically)
      toast.error(ERROR_MESSAGES.FILE_EXPORT.FAILED, {
        id: loadingToastId,
        description: errorMessageText,
        duration: 5000,
      });
    }
  }, [builder, data, filename, errorMessage, validator, setValidationAttempted]);

  return {
    exportFile,
  };
}
