import { cn } from "@/lib/utils";

interface FormGroupProps {
  children: React.ReactNode;
  columns?: 2 | 3;
  className?: string;
}

export function FormGroup({
  children,
  columns = 2,
  className = "",
}: FormGroupProps) {
  const gridCols =
    columns === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={cn("grid gap-4", gridCols, className)}>{children}</div>
  );
}
