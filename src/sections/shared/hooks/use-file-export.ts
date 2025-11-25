import { useCallback } from "react";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/sections/functional-profile/functional-profile-error-messages";
import { SUCCESS_MESSAGES } from "@/sections/functional-profile/functional-profile-success-messages";
import { useValidationStore } from "@/sections/shared/validation-store";
import { FunctionalProfileFrame } from "@/models";
import { validateFunctionalProfileFrame } from "@/sections/functional-profile/functional-profile-frame-validator";

/**
 * Generic file export hook for XML files
 * @template T - The type of the data to export (e.g., FunctionalProfileFrame)
 * @param options - Configuration options
 * @param options.builder - Function to build the XML string from type T
 * @param options.data - The data to export
 * @param options.filename - The filename for the exported file (default: "export.xml")
 * @param options.errorMessage - Custom error message when data is missing
 * @returns Object with exportFile function
 */
export function useFileExport<T>({
  builder,
  data,
  filename = "export.xml",
  errorMessage = ERROR_MESSAGES.FILE_EXPORT.NO_DATA,
}: {
  builder: (data: T) => Promise<string>;
  data: T | null | undefined;
  filename?: string;
  errorMessage?: string;
}) {
  const setValidationAttempted = useValidationStore(
    (state) => state.setValidationAttempted
  );

  const exportFile = useCallback(async () => {
    if (!data) {
      toast.error(ERROR_MESSAGES.FILE_EXPORT.FAILED, {
        description: errorMessage,
      });
      return;
    }

    // Validate before exporting - this triggers validation error display
    // Check if data is a FunctionalProfileFrame (for validation)
    if (data && typeof data === "object" && "functionalProfile" in data) {
      const validation = validateFunctionalProfileFrame(
        data as FunctionalProfileFrame
      );

      // Mark validation as attempted so errors will be displayed
      setValidationAttempted(true);

      if (!validation.success) {
        // Count validation errors
        const errorCount = Object.keys(validation.fieldErrors || {}).length;
        const errorMessageText =
          errorCount > 0
            ? `Please fix ${errorCount} validation error${errorCount > 1 ? "s" : ""} before exporting.`
            : ERROR_MESSAGES.FILE_EXPORT.FAILED;

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
        error instanceof Error
          ? error.message
          : ERROR_MESSAGES.FILE_EXPORT.UNKNOWN_ERROR;

      // Update the loading toast to error (this replaces it automatically)
      toast.error(ERROR_MESSAGES.FILE_EXPORT.FAILED, {
        id: loadingToastId,
        description: errorMessageText,
        duration: 5000,
      });
    }
  }, [builder, data, filename, errorMessage, setValidationAttempted]);

  return {
    exportFile,
  };
}
