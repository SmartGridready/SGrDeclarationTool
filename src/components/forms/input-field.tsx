import { useState, useEffect } from "react";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";

interface InputFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: "text" | "number";
  error?: string;
  debounceMs?: number;
}

export function InputField({
  label,
  name,
  value,
  onChange,
  className = "",
  placeholder,
  disabled,
  required = false,
  type = "text",
  error,
  debounceMs = 300,
}: InputFieldProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const inputClassName = hasError ? `${className} border-destructive focus-visible:ring-destructive` : className;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={localValue}
        onChange={handleChange}
        className={inputClassName}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
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
