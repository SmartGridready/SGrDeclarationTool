import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TextFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export function TextField({
  label,
  name,
  value,
  onChange,
  className = "",
  placeholder,
  disabled,
  required = false,
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
    </div>
  );
}
