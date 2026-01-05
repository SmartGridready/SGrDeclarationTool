"use client";

import { BaseModal } from "@/components/editor/base-modal";
import { Button } from "@/components/shadcn/button";
import { LoadingSpinner } from "@/components/shadcn/loading-spinner";

interface XmlPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  previewHtml: string | null;
  isLoading: boolean;
  title?: string;
  width?: string | number;
  height?: string | number;
}

/**
 * XML Preview Modal - Displays rendered XML/XSL preview
 */
export function XmlPreviewModal({
  open,
  onOpenChange,
  previewHtml,
  isLoading,
  title = "XML Preview",
  width = "90vw",
  height = "85vh",
}: XmlPreviewModalProps) {
  const content = (
    <div className="h-full w-full overflow-hidden relative">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner message="Generating preview..." />
        </div>
      ) : previewHtml ? (
        <iframe
          srcDoc={previewHtml}
          className="w-full h-full border-0"
          title="XML Preview"
          sandbox="allow-same-origin allow-scripts allow-forms"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">No preview available</p>
        </div>
      )}
    </div>
  );

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      content={content}
      width={width}
      height={height}
      className="p-0"
      contentClassName="p-0"
      footer={
        <div className="flex justify-end px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      }
    />
  );
}
