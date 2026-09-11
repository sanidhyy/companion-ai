"use client";

import type { Companion, Message } from "@/lib/generated/prisma/client";
import { useCompletion } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { ChatForm } from "@/components/chat-form";
import { ChatHeader } from "@/components/chat-header";
import type { ChatMessageProps } from "@/components/chat-message";
import { ChatMessages } from "@/components/chat-messages";
import { useRequireApiKeys } from "@/hooks/use-require-api-keys";
import { API_KEYS_REQUIRED_MESSAGE } from "@/config";
import { toast } from "sonner";

type ChatClientProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
  hasApiKeys: boolean;
};

export const ChatClient = ({ companion, hasApiKeys }: ChatClientProps) => {
  const router = useRouter();
  const { requireApiKeys, showApiKeysRequiredToast } = useRequireApiKeys();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.messages,
  );

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      streamProtocol: "text",
      onFinish: (_prompt, completion) => {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
      onError: (error) => {
        setMessages((current) => current.slice(0, -1));

        if (error.message === API_KEYS_REQUIRED_MESSAGE) {
          showApiKeysRequiredToast(error.message);
          return;
        }

        toast.error(error.message || "Something went wrong. Please try again.");
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!requireApiKeys(hasApiKeys)) {
      return;
    }

    if (!input.trim()) {
      return;
    }

    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />

      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />

      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
