import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function getSecureCookieName(cookieName: string) {
  const baseUrl = absoluteUrl("");
  const isSecure = baseUrl.startsWith("https://");

  return isSecure ? `__Secure-${cookieName}` : cookieName;
}
