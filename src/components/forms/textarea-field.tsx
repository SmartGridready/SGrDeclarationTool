import { useState, useEffect } from "react";
import { Label } from "@/components/shadcn/label";
import { Textarea } from "@/components/shadcn/textarea";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";

interface TextareaFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  rows?: number;
  /**
   * Debounce delay in milliseconds. Set to 0 to disable debouncing.
   * Default: 300ms
   */
  debounceMs?: number;
}

export function TextareaField({
  label,
  name,
  value,
  onChange,
  className = "",
  placeholder,
  disabled,
  required = false,
  error,
  rows = 4,
  debounceMs = 300,
}: TextareaFieldProps) {
  // Local state for immediate UI updates
  const [localValue, setLocalValue] = useState(value ?? "");

  // Update local value when prop value changes (e.g., from store)
  useEffect(() => {
    setLocalValue(value ?? "");
  }, [value]);

  // Debounced onChange handler
  const debouncedOnChange = useDebouncedCallback(
    ((newValue: string) => {
      onChange?.(newValue);
    }) as (...args: unknown[]) => void,
    debounceMs
  ) as (value: string) => void;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    // Update local state immediately for responsive UI
    setLocalValue(newValue);
    // Debounce the store update
    if (debounceMs > 0) {
      debouncedOnChange(newValue);
    } else {
      onChange?.(newValue);
    }
  };

  const hasError = !!error;
  const textareaClassName = hasError
    ? `${className} border-destructive focus-visible:ring-destructive break-words`
    : `${className} break-words`;

  return (
    <div className="space-y-2 min-w-0">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={localValue}
        onChange={handleChange}
        className={textareaClassName}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
