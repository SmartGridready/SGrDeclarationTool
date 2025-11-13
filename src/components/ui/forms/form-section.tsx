"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export function FormSection({
  title,
  description,
  children,
  className,
  required = false,
}: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className={cn("w-full", className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <CollapsibleTrigger className="flex items-center justify-between w-full hover:opacity-70 transition-opacity">
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
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-4">{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
