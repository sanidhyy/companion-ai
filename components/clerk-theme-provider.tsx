"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import type { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";

export const ClerkThemeProvider = ({ children }: PropsWithChildren) => {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
    >
      <Toaster richColors closeButton />
      {children}
    </ClerkProvider>
  );
};
