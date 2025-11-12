"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OptionalFieldProps {
  label: string;
  isPresent: boolean;
  onAdd: () => void;
  onRemove: () => void;
  children: React.ReactNode;
}

export function OptionalField({
  label,
  isPresent,
  onAdd,
  onRemove,
  children,
}: OptionalFieldProps) {
  if (!isPresent) {
    return (
      <div className="flex flex-col">
        <span className="text-sm text-muted-foreground">{`${label}`}</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="w-fit mt-2"
        >
          <Plus className="h-4 w-4 mr-1" />
          {`Add ${label}`}
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 mb-2">{children}</div>{" "}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="shrink-0"
        title={`Remove ${label}`}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
        {`Remove ${label}`}
      </Button>
    </>
  );
}
