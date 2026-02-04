import { useCallback } from "react";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { SUCCESS_MESSAGES } from "@/constants/success-messages";
import { useValidationStore } from "@/sections/shared/validation-store";
import { ValidationResult, getFirstFieldError } from "@/utils/validation-utils";

/**
 * Hook for exporting data to XML files with validation and toast notifications.
 * @param options - Configuration with builder, data, filename, and optional validator
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
  const resetValidation = useValidationStore((state) => state.resetValidation);

  const exportFile = useCallback(async () => {
    if (!data) {
      toast.error(ERROR_MESSAGES.FILE_EXPORT.FAILED, {
        description: errorMessage,
      });
      return;
    }

    if (validator) {
      const validation = validator(data);

      setValidationAttempted(true);

      if (!validation.success) {
        const firstFieldError = getFirstFieldError(validation);
        const errorMessageText = firstFieldError || "Please fix validation errors before exporting.";

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

      const blob = new Blob([xmlString], { type: "application/xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(SUCCESS_MESSAGES.FILE_EXPORT.BUILD_SUCCESS, {
        id: loadingToastId,
        description: SUCCESS_MESSAGES.FILE_EXPORT.DOWNLOAD_READY(filename),
      });

      resetValidation();
    } catch (error) {
      const errorMessageText = error instanceof Error ? error.message : ERROR_MESSAGES.FILE_EXPORT.UNKNOWN_ERROR;

      toast.error(ERROR_MESSAGES.FILE_EXPORT.FAILED, {
        id: loadingToastId,
        description: errorMessageText,
        duration: 5000,
      });
    }
  }, [builder, data, filename, errorMessage, validator, setValidationAttempted, resetValidation]);

  return {
    exportFile,
  };
}
