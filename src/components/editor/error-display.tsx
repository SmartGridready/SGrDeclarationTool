"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/utils/style-utils";

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Reusable error display component.
 */
export function ErrorDisplay({ message = "Something went wrong", onRetry, className }: ErrorDisplayProps) {
  return (
    <div className={cn("flex flex-col items-center gap-4 min-h-[400px] justify-center", className)}>
      <AlertCircle className="h-12 w-12 text-destructive" />
      <p className="text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          Try again
        </Button>
      )}
    </div>
  );
}
