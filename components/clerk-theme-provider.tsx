"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import { useTheme } from "next-themes";
import type { PropsWithChildren } from "react";

import { useIsClient } from "@/hooks/use-is-client";

export const ClerkThemeProvider = ({ children }: PropsWithChildren) => {
  const isClient = useIsClient();
  const { resolvedTheme } = useTheme();

  if (!isClient) return null;

  return (
    <ClerkProvider
      appearance={{
        theme: resolvedTheme === "dark" ? dark : undefined,
        options: {
          logoPlacement: "none",
          socialButtonsVariant: "iconButton",
          socialButtonsPlacement: "bottom",
          showOptionalFields: true,
        },
        variables: {
          colorPrimary: resolvedTheme === "dark" ? "#262626" : "#F5F5F5",
        },
        elements: {
          footerActionLink:
            resolvedTheme === "dark"
              ? "text-white hover:text-white/70"
              : undefined,
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
};
