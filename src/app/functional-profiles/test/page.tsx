"use client";

import { useState, useRef } from "react";
import { Button } from "@/sections/shared/components/shadcn/button";
import { parseFunctionalProfile } from "@/sections/functional-profile/functional-profile-mapper";
import { buildFunctionalProfileToXml } from "@/sections/functional-profile/functional-profile-builder";
import { diffLines } from "diff";

/**
 * Computes unified diff using diff library
 */
function computeUnifiedDiff(original: string, rebuilt: string) {
  return diffLines(original, rebuilt);
}

export default function FunctionalProfileTestPage() {
  const [diff, setDiff] = useState<ReturnType<typeof diffLines>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset input so the same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setIsProcessing(true);

    try {
      const fileContent = await readFileAsText(file);
      const parsedFrame = await parseFunctionalProfile(fileContent);
      const rebuilt = await buildFunctionalProfileToXml(parsedFrame);
      const diffResult = computeUnifiedDiff(fileContent, rebuilt);
      setDiff(diffResult);
    } catch (error) {
      console.error("Processing failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <input
        ref={inputRef}
        type="file"
        accept=".xml"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload XML file"
      />
      <Button onClick={handleUpload} disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Upload XML File"}
      </Button>

      {diff.length > 0 && (
        <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[600px] text-xs font-mono">
          {diff.map((part, index) => {
            if (part.added) {
              return (
                <span
                  key={index}
                  className="bg-green-500/20 text-green-700 dark:text-green-400 block"
                >
                  + {part.value}
                </span>
              );
            }
            if (part.removed) {
              return (
                <span key={index} className="bg-destructive/20 text-destructive block">
                  - {part.value}
                </span>
              );
            }
            return (
              <span key={index} className="text-foreground block">
                {" "}
                {part.value}
              </span>
            );
          })}
        </pre>
      )}
    </div>
  );
}

/**
 * Reads a file as text
 */
function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        resolve(e.target.result);
      } else {
        reject(new Error("Failed to read file as text"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    reader.readAsText(file);
  });
}
