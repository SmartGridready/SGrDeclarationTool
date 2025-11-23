import { useCallback } from "react";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/lib/constants/error-messages";
import { SUCCESS_MESSAGES } from "@/lib/constants/success-messages";

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
  const exportFile = useCallback(async () => {
    if (!data) {
      toast.error(ERROR_MESSAGES.FILE_EXPORT.FAILED, {
        description: errorMessage,
      });
      return;
    }

    const loadingToast = toast.loading("Exporting file...", {
      description: `Generating ${filename}`,
    });

    try {
      const xmlString = await builder(data);
      toast.dismiss(loadingToast);

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

      toast.success(SUCCESS_MESSAGES.FILE_EXPORT.BUILD_SUCCESS, {
        description: SUCCESS_MESSAGES.FILE_EXPORT.DOWNLOAD_READY(filename),
      });
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage =
        error instanceof Error
          ? error.message
          : ERROR_MESSAGES.FILE_EXPORT.UNKNOWN_ERROR;

      toast.error(ERROR_MESSAGES.FILE_EXPORT.FAILED, {
        description: errorMessage,
        duration: 5000,
      });
    }
  }, [builder, data, filename, errorMessage]);

  return {
    exportFile,
  };
}
