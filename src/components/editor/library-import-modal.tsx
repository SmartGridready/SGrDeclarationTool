"use client";

import { useState, useEffect } from "react";
import { BaseModal } from "@/components/editor/base-modal";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { LoadingSpinner } from "@/components/shadcn/loading-spinner";
import { Search } from "lucide-react";
import { LibraryItem } from "@/utils/library-api-utils";
import { cn } from "@/utils/style-utils";

interface LibraryImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  profiles: LibraryItem[];
  loading: boolean;
  error: string | null;
  onSelect: (item: LibraryItem) => void;
  confirmLabel?: string;
  cancelLabel?: string;
  searchPlaceholder?: string;
  width?: string | number;
  height?: string | number;
}

/**
 * Library Import Modal - Allows users to search and select items from a library
 */
export function LibraryImportModal({
  open,
  onOpenChange,
  title,
  description,
  profiles,
  loading,
  error,
  onSelect,
  confirmLabel = "Import",
  cancelLabel = "Cancel",
  searchPlaceholder = "Search profiles...",
  width = "66.666667%",
  height = "80vh",
}: LibraryImportModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);

  // Reset selection when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setSelectedItem(null);
      setSearchTerm("");
    }
  }, [open]);

  const filteredItems = profiles.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const identifier = item.identifier.toLowerCase();
    return identifier.includes(term);
  });

  const handleConfirm = () => {
    if (selectedItem) {
      onSelect(selectedItem);
      onOpenChange(false);
    }
  };

  const content = (
    <div className="flex flex-col gap-4 h-full">
      <div className="relative shrink-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex-1 border rounded-lg overflow-hidden bg-muted/20 min-h-0">
        {loading ? (
          <div className="flex items-center justify-center h-full min-h-[200px]">
            <LoadingSpinner message="Loading profiles..." />
          </div>
        ) : error ? (
          <div className="p-6 text-center text-destructive">{error}</div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center p-6">
            <div className="text-muted-foreground mb-2">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-medium mb-2">No items found</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {searchTerm ? "No items match your search. Try a different term." : "No items available."}
            </p>
          </div>
        ) : (
          <div className="h-full overflow-auto p-2">
            <ul className="space-y-1">
              {filteredItems.map((item, index) => {
                const isSelected = selectedItem === item;

                return (
                  <li
                    key={item.identifier || index}
                    className={cn(
                      "p-3 border rounded-lg cursor-pointer transition-colors",
                      "hover:bg-muted/50",
                      isSelected && "bg-muted/40 border-primary"
                    )}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.identifier}</div>
                      </div>
                      {isSelected && <div className="ml-2 text-xs text-primary font-medium">Selected</div>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      content={content}
      width={width}
      height={height}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedItem || loading}>
            {confirmLabel}
          </Button>
        </div>
      }
    />
  );
}
