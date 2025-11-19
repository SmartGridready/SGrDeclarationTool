import { useCallback, useRef } from "react";
import { toast } from "sonner";

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
        toast.success("File imported successfully", {
          description: `${file.name} has been loaded.`,
        });
      } catch (error) {
        toast.dismiss(loadingToast);

        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unknown error occurred while processing the file.";

        toast.error("Failed to import file", {
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
        reject(new Error("Failed to read file as text"));
      }
    };

    reader.onerror = () => {
      reject(new Error(`Error reading file: ${file.name}`));
    };

    reader.readAsText(file);
  });
}
