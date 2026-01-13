"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster, type ToasterProps } from "sonner";
import { useEffect, useState } from "react";

export function Toaster(props: ToasterProps) {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the current theme: use resolved theme or fallback to system
  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "light";

  return <SonnerToaster theme={currentTheme as "light" | "dark"} {...props} />;
}
