"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/utils/style-utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  isAdded?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  nested?: boolean;
  defaultOpen?: boolean;
}

export function FormSection({
  title,
  description,
  children,
  className,
  required = false,
  isAdded,
  onAdd,
  onRemove,
  nested = false,
  defaultOpen = false,
}: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Nested variant - same Card styling as parent, just slightly smaller
  if (nested) {
    // If not required and not added, show Add button (same as top-level)
    if (!required && !isAdded) {
      return (
        <Card
          className={cn("w-full cursor-pointer hover:opacity-70 transition-opacity", className)}
        >
          <CardHeader className="py-1 px-3" onClick={onAdd}>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start text-left">
                <CardTitle className="text-base flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {title}
                </CardTitle>
                {description && <CardDescription className="mt-0.5">{description}</CardDescription>}
              </div>
            </div>
          </CardHeader>
        </Card>
      );
    }

    return (
      <Card className={cn("w-full", className)}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CardHeader className="py-1 px-3">
            <div className="flex items-center justify-between w-full">
              <CollapsibleTrigger className="flex items-center justify-between flex-1 hover:opacity-70 transition-opacity">
                <div className="flex flex-col items-start text-left">
                  <CardTitle className="text-base flex items-center gap-2">
                    {title}
                    {required && <span className="text-destructive ml-1">*</span>}
                  </CardTitle>
                  {description && (
                    <CardDescription className="mt-0.5">{description}</CardDescription>
                  )}
                </div>
                <div className="ml-4 shrink-0">
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 transition-transform" />
                  ) : (
                    <ChevronRight className="h-4 w-4 transition-transform" />
                  )}
                </div>
              </CollapsibleTrigger>
              {!required && isAdded && onRemove && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onRemove}
                  className="ml-2 shrink-0 h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0 px-3 pb-1.5 space-y-3">{children}</CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  }

  // If not required and not added, show Add button
  if (!required && !isAdded) {
    return (
      <Card className={cn("w-full cursor-pointer hover:opacity-70 transition-opacity", className)}>
        <CardHeader className="py-1 px-3" onClick={onAdd}>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start text-left">
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {title}
              </CardTitle>
              {description && <CardDescription className="mt-0.5">{description}</CardDescription>}
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="py-1 px-3">
          <div className="flex items-center justify-between w-full">
            <CollapsibleTrigger className="flex items-center justify-between flex-1 hover:opacity-70 transition-opacity">
              <div className="flex flex-col items-start text-left">
                <CardTitle className="text-base flex items-center gap-2">
                  {title}
                  {required && <span className="text-destructive ml-1">*</span>}
                </CardTitle>
                {description && <CardDescription className="mt-0.5">{description}</CardDescription>}
              </div>
              <div className="ml-4 shrink-0">
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 transition-transform" />
                )}
              </div>
            </CollapsibleTrigger>
            {!required && isAdded && onRemove && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="ml-2 shrink-0 h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="pt-0 px-3 pb-1.5 space-y-3">{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
