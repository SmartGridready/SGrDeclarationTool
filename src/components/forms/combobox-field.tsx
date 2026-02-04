"use client";

import * as React from "react";
import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { cn } from "@/utils/style-utils";

export interface ComboboxOption {
  readonly value: string;
  readonly label: string;
}

interface ComboboxFieldProps {
  label: string;
  name: string;
  options: readonly ComboboxOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

/**
 * ComboboxField allows users to either select from predefined options
 * or enter a custom value (e.g., template syntax like {{parameter_name}}).
 * Uses shadcn Popover component styled to match Select component.
 */
export function ComboboxField({
  label,
  name,
  options,
  placeholder = "Select or enter a value",
  value,
  onChange,
  className = "",
  disabled,
  required = false,
  error,
}: ComboboxFieldProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Filter options only when user is actively typing
  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options;
    const lowerSearch = searchTerm.toLowerCase();
    return options.filter(
      (option) => option.value.toLowerCase().includes(lowerSearch) || option.label.toLowerCase().includes(lowerSearch)
    );
  }, [searchTerm, options]);

  const handleOptionSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setSearchTerm("");
    setOpen(false);
  };

  const inputClassName = error ? `${className} border-destructive focus:ring-destructive` : className;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id={name}
              name={name}
              type="text"
              value={value ?? ""}
              onChange={(e) => {
                const newValue = e.target.value;
                onChange?.(newValue);
                setSearchTerm(newValue);
                if (!open) setOpen(true);
              }}
              onFocus={() => {
                setSearchTerm("");
                setOpen(true);
              }}
              className={cn(
                `w-full pr-8 ${inputClassName}`,
                "border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full px-3 flex items-center justify-center opacity-50 hover:opacity-100 focus:outline-none disabled:pointer-events-none pointer-events-none"
              disabled={disabled}
              aria-label="Open options"
              tabIndex={-1}
            >
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-1"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-[300px] overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">No options found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;
                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    tabIndex={0}
                    onClick={() => handleOptionSelect(option.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleOptionSelect(option.value);
                      }
                    }}
                    className={cn(
                      "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none",
                      "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                      "hover:bg-accent hover:text-accent-foreground",
                      disabled && "pointer-events-none opacity-50"
                    )}
                  >
                    <span className="flex-1 truncate">{option.label}</span>
                    {isSelected && (
                      <span className="absolute right-2 flex size-3.5 items-center justify-center">
                        <CheckIcon className="size-4" />
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
