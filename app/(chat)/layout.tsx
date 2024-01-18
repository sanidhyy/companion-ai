import type { PropsWithChildren } from "react";

const ChatLayout = ({ children }: PropsWithChildren) => {
  return <div className="mx-auto max-w-4xl h-full w-full">{children}</div>;
};

export default ChatLayout;
