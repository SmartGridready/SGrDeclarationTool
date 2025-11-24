import { cn } from "@/sections/shared/style-utils";

interface FormGroupProps {
  children: React.ReactNode;
  columns?: 2 | 3;
  className?: string;
  header?: string;
  description?: string;
}

export function FormGroup({
  children,
  columns = 2,
  className = "",
  header,
  description,
}: FormGroupProps) {
  const gridCols =
    columns === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={cn("space-y-4", className)}>
      {(header || description) && (
        <div className="space-y-1.5">
          {header && (
            <h3 className="text-md font-semibold leading-none">{header}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className={cn("grid gap-4", gridCols)}>{children}</div>
    </div>
  );
}
