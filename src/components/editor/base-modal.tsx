"use client";

import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/shadcn/dialog";
import { cn } from "@/utils/style-utils";

interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: ReactNode;
  width?: string | number;
  height?: string | number;
  description?: string;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function BaseModal({
  open,
  onOpenChange,
  title,
  content,
  width,
  height,
  description,
  footer,
  className,
  contentClassName,
}: BaseModalProps) {
  const widthStyle = width ? (typeof width === "number" ? `${width}px` : width) : undefined;
  const heightStyle = height ? (typeof height === "number" ? `${height}px` : height) : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex flex-col p-0",
          !widthStyle && "max-w-[calc(100%-2rem)]",
          !heightStyle && "max-h-[90vh]",
          className
        )}
        style={{
          ...(widthStyle && { width: widthStyle }),
          ...(heightStyle && { height: heightStyle }),
        }}
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <DialogTitle>{title}</DialogTitle>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </DialogHeader>

        <div
          className={cn(
            "flex-1 flex flex-col overflow-hidden min-h-0",
            contentClassName || "px-6 py-4"
          )}
        >
          {content}
        </div>

        {footer && <div className="px-6 py-4 border-t shrink-0">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
