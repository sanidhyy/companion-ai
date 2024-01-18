import type { Companion } from "@prisma/client";
import Image from "next/image";

type CompanionsProps = {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
};

export const Companions = ({ data }: CompanionsProps) => {
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
  return <div className="">Companions</div>;
};
