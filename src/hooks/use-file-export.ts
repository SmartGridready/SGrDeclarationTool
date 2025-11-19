import { useCallback } from "react";
import { toast } from "sonner";

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
  errorMessage = "No data to export",
}: {
  builder: (data: T) => Promise<string>;
  data: T | null | undefined;
  filename?: string;
  errorMessage?: string;
}) {
  const exportFile = useCallback(async () => {
    if (!data) {
      toast.error("Export failed", {
        description: errorMessage,
      });
      return;
    }

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
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown error occurred while exporting.";

      toast.error("Export failed", {
        description: errorMessage,
        duration: 5000,
      });
    }
  }, [builder, data, filename, errorMessage]);

  return {
    exportFile,
  };
}
