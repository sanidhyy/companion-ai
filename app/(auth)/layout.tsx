import { Poppins } from "next/font/google";
import Link from "next/link";
import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col space-y-6 items-center justify-center h-full">
      <Link href="/">
        <h1
          className={cn(
            "hidden md:block text-xl md:text-3xl font-bold text-primary",
            font.className
          )}
        >
          companion.ai
        </h1>
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;
