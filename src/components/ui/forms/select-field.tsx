import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: readonly SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export function SelectField({
  label,
  name,
  options,
  placeholder = "Select an option",
  className = "",
  value,
  onChange,
  required = false,
  ...props
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange} {...props}>
        <SelectTrigger id={name} className={`w-full ${className}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
