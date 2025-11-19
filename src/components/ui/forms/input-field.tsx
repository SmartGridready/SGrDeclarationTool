import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: "text" | "number" | "date";
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
}: InputFieldProps) {
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
