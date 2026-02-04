"use client";

import { ErrorDisplay } from "@/components/editor/error-display";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorDisplay message="Failed to load functional profile editor" onRetry={reset} />;
}
