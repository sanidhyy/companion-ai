import type { PropsWithChildren } from "react";

import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { checkSubscription } from "@/lib/subscription";
import { hasUserApiKeys } from "@/lib/user-api-keys";

const RootLayout = async ({ children }: PropsWithChildren) => {
  const [isPro, hasApiKeys] = await Promise.all([
    checkSubscription(),
    hasUserApiKeys(),
  ]);

  return (
    <div className="h-full">
      <Navbar isPro={isPro} hasApiKeys={hasApiKeys} />
      <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
        <Sidebar isPro={isPro} hasApiKeys={hasApiKeys} />
      </div>
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
