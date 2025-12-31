import { Label } from "@/components/shadcn/label";
import { Textarea } from "@/components/shadcn/textarea";

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
}: TextareaFieldProps) {
  const hasError = !!error;
  const textareaClassName = hasError ? `${className} border-destructive focus-visible:ring-destructive` : className;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
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
