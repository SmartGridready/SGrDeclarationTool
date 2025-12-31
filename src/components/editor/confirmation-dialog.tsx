"use client";

import { BaseModal } from "@/components/editor/base-modal";
import { Button } from "@/components/shadcn/button";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  cancelLabel?: string;
  width?: string | number;
  height?: string | number;
}

/**
 * Confirmation Dialog - Simple dialog for user confirmations
 */
export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  onConfirm,
  cancelLabel = "Cancel",
  width = 400,
  height,
}: ConfirmationDialogProps) {
  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      content={<p className="text-sm text-muted-foreground">{description}</p>}
      width={width}
      height={height}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      }
    />
  );
}
