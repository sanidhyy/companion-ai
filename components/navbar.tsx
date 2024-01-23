"use client";

import { UserButton } from "@clerk/nextjs";
import { Github, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";

import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "./mode-toggle";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

type NavbarProps = {
  isPro: boolean;
};

export const Navbar = ({ isPro }: NavbarProps) => {
  const proModal = useProModal();

  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <MobileSidebar isPro={isPro} />

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
      </div>

      <div className="flex items-center gap-x-3">
        {!isPro && (
          <Button variant="premium" size="sm" onClick={proModal.onOpen}>
            Upgrade <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
          </Button>
        )}

        <ModeToggle />

        <Link
          href="https://github.com/sanidhyy/companion-ai"
          target="_blank"
          rel="noreferrer noopener"
          className="mr-2"
        >
          <Github className="h-[1.2rem] w-[1.2rem] mr-2" />
        </Link>

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
