"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      {...props}
      scriptProps={{
        ...props.scriptProps,
        ...(typeof window === "undefined"
          ? undefined
          : { type: "application/json" }),
      }}
    >
      {children}
    </NextThemesProvider>
  );
};
