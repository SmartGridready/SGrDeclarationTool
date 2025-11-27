"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Label } from "@/sections/shared/components/shadcn/label";
import { Button } from "@/sections/shared/components/shadcn/button";
import { Calendar } from "@/sections/shared/components/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/sections/shared/components/shadcn/popover";
import { cn } from "@/sections/shared/utils/style-utils";

interface DateFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export function DateField({
  label,
  name,
  value,
  onChange,
  className = "",
  placeholder = "Select date",
  disabled,
  required = false,
  error,
}: DateFieldProps) {
  const [open, setOpen] = React.useState(false);
  const hasError = !!error;

  // Convert string value (YYYY-MM-DD) to Date object
  const date = React.useMemo(() => {
    if (!value) return undefined;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? undefined : parsed;
  }, [value]);

  // Convert Date object to string (YYYY-MM-DD)
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Format as YYYY-MM-DD
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      onChange?.(`${year}-${month}-${day}`);
    } else {
      onChange?.("");
    }
    setOpen(false);
  };

  const buttonClassName = cn(
    "w-full justify-between font-normal",
    !date && "text-muted-foreground",
    hasError && "border-destructive focus-visible:ring-destructive",
    className
  );

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={name}
            className={buttonClassName}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${name}-error` : undefined}
          >
            {date ? date.toLocaleDateString() : <span>{placeholder}</span>}
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={handleDateSelect}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p
          id={`${name}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
