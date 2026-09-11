"use client";

import type { Companion } from "@/lib/generated/prisma/client";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useRequireApiKeys } from "@/hooks/use-require-api-keys";

type CompanionsProps = {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
  hasApiKeys: boolean;
};

export const Companions = ({ data, hasApiKeys }: CompanionsProps) => {
  const router = useRouter();
  const { requireApiKeys } = useRequireApiKeys();

  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image src="/empty.png" alt="Empty" fill className="grayscale" />
        </div>
        <p className="text-sm text-muted-foreground">No companions found.</p>
      </div>
    );
  }

  const onOpenChat = (companionId: string) => {
    if (!requireApiKeys(hasApiKeys)) {
      return;
    }

    router.push(`/chat/${companionId}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10">
      {data.map((item) => (
        <Card
          key={item.id}
          role="button"
          tabIndex={0}
          onClick={() => onOpenChat(item.id)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenChat(item.id);
            }
          }}
          className="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
        >
          <CardHeader className="flex items-center justify-center text-center text-muted-foreground">
            <div className="relative w-32 h-32">
              <Image
                src={item.src}
                alt={item.name}
                fill
                className="rounded-xl object-cover"
              />
            </div>

            <p className="font-bold">{item.name}</p>
            <p className="text-xs">{item.description}</p>
          </CardHeader>

          <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
            <p className="lowercase">@{item.userName}</p>
            <div className="flex items-center">
              <MessagesSquare className="w-3 h-3 mr-1" />
              {item._count.messages}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
