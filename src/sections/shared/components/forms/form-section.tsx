"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/sections/shared/components/shadcn/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/sections/shared/components/shadcn/collapsible";
import { Button } from "@/sections/shared/components/shadcn/button";
import { cn } from "@/sections/shared/style-utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  isAdded?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
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
}: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  // If not required and not added, show Add button
  if (!required && !isAdded) {
    return (
      <Card
        className={cn(
          "w-full cursor-pointer hover:opacity-70 transition-opacity",
          className
        )}
      >
        <CardHeader className="pb-3" onClick={onAdd}>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start text-left">
              <CardTitle className="text-lg flex items-center gap-2">
                <Plus className="h-5 w-5" />
                {title}
              </CardTitle>
              {description && (
                <CardDescription className="mt-1.5">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between w-full">
            <CollapsibleTrigger className="flex items-center justify-between flex-1 hover:opacity-70 transition-opacity">
              <div className="flex flex-col items-start text-left">
                <CardTitle className="text-lg flex items-center gap-2">
                  {title}
                  {required && <span className="text-destructive ml-1">*</span>}
                </CardTitle>
                {description && (
                  <CardDescription className="mt-1.5">
                    {description}
                  </CardDescription>
                )}
              </div>
              <div className="ml-4 shrink-0">
                {isOpen ? (
                  <ChevronDown className="h-5 w-5 transition-transform" />
                ) : (
                  <ChevronRight className="h-5 w-5 transition-transform" />
                )}
              </div>
            </CollapsibleTrigger>
            {!required && isAdded && onRemove && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="ml-2 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-4">{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
