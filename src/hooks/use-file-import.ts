import { useCallback, useRef } from "react";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/constants/error-messages";
import { SUCCESS_MESSAGES } from "@/constants/success-messages";

/**
 * Generic file import hook for XML files
 * @template T - The type of the parsed result (e.g., FunctionalProfileFrame)
 * @param options - Configuration options
 * @param options.parser - Function to parse the XML string into type T
 * @param options.onSuccess - Callback when file is successfully parsed
 * @param options.accept - File input accept attribute (default: ".xml")
 * @returns Object with importFile function and input ref
 */
export function useFileImport<T>({
  parser,
  onSuccess,
  accept = ".xml",
}: {
  parser: (xmlString: string) => Promise<T>;
  onSuccess: (data: T) => void;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const importFile = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      // Reset input so the same file can be selected again
      if (inputRef.current) {
        inputRef.current.value = "";
      }

      // Show loading toast
      const loadingToast = toast.loading("Importing file...", {
        description: `Processing ${file.name}`,
      });

      try {
        const fileContent = await readFileAsText(file); // Read file as text
        const parsedData = await parser(fileContent); // Parse XML

        onSuccess(parsedData); // Update store

        toast.dismiss(loadingToast);
        toast.success(SUCCESS_MESSAGES.FILE_IMPORT.SUCCESS, {
          description: SUCCESS_MESSAGES.FILE_IMPORT.LOADED(file.name),
        });
      } catch (error) {
        toast.dismiss(loadingToast);

        const errorMessage =
          error instanceof Error ? error.message : ERROR_MESSAGES.FILE_IMPORT.UNKNOWN_ERROR;

        toast.error(ERROR_MESSAGES.FILE_IMPORT.FAILED, {
          description: errorMessage,
          duration: 5000, // Show error duration in milliseconds
        });
      }
    },
    [parser, onSuccess]
  );

  return {
    importFile,
    inputRef,
    handleFileChange,
    accept,
  };
}

/**
 * Reads a file as text
 */
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error(ERROR_MESSAGES.FILE_IMPORT.READ_FAILED));
      }
    };

    reader.onerror = () => {
      reject(new Error(ERROR_MESSAGES.FILE_IMPORT.READ_ERROR(file.name)));
    };

    reader.readAsText(file);
  });
}
