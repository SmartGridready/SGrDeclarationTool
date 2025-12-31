import { Loader2 } from "lucide-react";
import { cn } from "@/utils/style-utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

/**
 * Reusable loading spinner component
 */
export function LoadingSpinner({
  size = "md",
  message,
  className,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      className={cn(
        "flex flex-col items-center gap-4",
        fullScreen && "min-h-[400px] justify-center",
        className
      )}
    >
      <Loader2 className={cn(sizeClasses[size], "animate-spin text-muted-foreground")} />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="flex items-center justify-center w-full">{spinner}</div>;
  }

  return spinner;
}
