import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { ChatClient } from "./_components/chat-client";

type ChatIdPageProps = {
  params: Promise<{
    chatId: string;
  }>;
};

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { chatId } = await params;

  const { userId } = auth();

  if (!userId) return redirectToSignIn();

  const companion = await db.companion.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) return redirect("/");

  return <ChatClient companion={companion} />;
};

export default ChatIdPage;
