"use client";

import { ErrorDisplay } from "@/components/editor/error-display";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorDisplay message="Something went wrong" onRetry={reset} />;
}
