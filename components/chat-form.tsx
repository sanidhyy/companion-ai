import type { ChatRequestOptions } from "ai";
import { SendHorizonal } from "lucide-react";
import type { FormEvent, ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatFormProps = {
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void;
  isLoading: boolean;
};

export const ChatForm = ({
  input,
  handleInputChange,
  onSubmit,
  isLoading,
}: ChatFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="border-t border-primary/10 py-4 flex items-center gap-x-2"
    >
      <Input
        disabled={isLoading}
        aria-disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message..."
        className="rounded-lg bg-primary/10"
      />

      <Button disabled={isLoading} aria-disabled={isLoading} variant="ghost">
        <SendHorizonal className="w-6 h-6" />
      </Button>
    </form>
  );
};
