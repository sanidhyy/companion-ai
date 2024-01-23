"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import type { PropsWithChildren } from "react";

export const ClerkThemeProvider = ({ children }: PropsWithChildren) => {
  const { resolvedTheme } = useTheme();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        layout: {
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
