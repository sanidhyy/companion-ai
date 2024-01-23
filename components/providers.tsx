"use client";
import { useEffect, type PropsWithChildren, useState } from "react";

import { Toaster } from "@/components/ui/sonner";

import { ClerkThemeProvider } from "./clerk-theme-provider";
import { ProModal } from "./pro-modal";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClerkThemeProvider>
        <Toaster richColors closeButton />
        <ProModal />

        {children}
      </ClerkThemeProvider>
    </ThemeProvider>
  );
};
