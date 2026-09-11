"use client";
import type { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";
import { useIsClient } from "@/hooks/use-is-client";

import { ClerkThemeProvider } from "./clerk-theme-provider";
import { ProModal } from "./pro-modal";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: PropsWithChildren) => {
  const isClient = useIsClient();

  if (!isClient) return null;

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
