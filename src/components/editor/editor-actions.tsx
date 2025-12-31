"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Upload, ChevronDown, HardDrive, Library, Download, Eye } from "lucide-react";

interface EditorActionsProps {
  title: string;
  onImportFromFilesystem?: () => void;
  onImportFromLibrary?: () => void;
  onEmpty?: () => void;
  onClear: () => void;
  onExport?: () => void;
  onPreview?: () => void;
  emptyButtonLabel?: string;
  isLoading?: boolean;
}

export function EditorActions({
  title,
  onImportFromFilesystem,
  onImportFromLibrary,
  onEmpty,
  onClear,
  onExport,
  onPreview,
  emptyButtonLabel = "Empty",
  isLoading = false,
}: EditorActionsProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number | undefined>(undefined);

  const updateWidth = () => {
    if (triggerRef.current) {
      setDropdownWidth(triggerRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        {onEmpty && (
          <Button variant="outline" onClick={onEmpty}>
            {emptyButtonLabel}
          </Button>
        )}

        <DropdownMenu onOpenChange={(open) => open && updateWidth()}>
          <DropdownMenuTrigger asChild>
            <Button ref={triggerRef} variant="outline" disabled={isLoading}>
              <Upload className="h-4 w-4 mr-2" />
              Import
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" style={{ width: dropdownWidth ? `${dropdownWidth}px` : undefined }}>
            <DropdownMenuItem onClick={onImportFromFilesystem}>
              <HardDrive className="h-4 w-4 mr-2" />
              Filesystem
            </DropdownMenuItem>

            <DropdownMenuItem onClick={onImportFromLibrary}>
              <Library className="h-4 w-4 mr-2" />
              Library
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {onPreview && (
          <Button variant="outline" onClick={onPreview} disabled={isLoading}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        )}

        {onExport && (
          <Button variant="outline" onClick={onExport} disabled={isLoading}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}

        <Button variant="outline" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  );
}
