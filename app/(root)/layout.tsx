import type { PropsWithChildren } from "react";

import { Navbar } from "@/components/navbar";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  );
};

export default RootLayout;
