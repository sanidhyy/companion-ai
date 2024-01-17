"use client";
import { useEffect, type PropsWithChildren, useState } from "react";

import { ClerkThemeProvider } from "./clerk-theme-provider";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClerkThemeProvider>{children}</ClerkThemeProvider>
    </ThemeProvider>
  );
};
