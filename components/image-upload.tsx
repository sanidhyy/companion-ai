"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

import type { CldUploadWidgetInfo } from "@/types";

type ImageUploadProps = {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
};

function instanceOfCldUploadWidgetInfo(
  object: any
): object is CldUploadWidgetInfo {
  return "secure_url" in object;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        onUpload={(result) => {
          if (!instanceOfCldUploadWidgetInfo(result.info))
            return console.error("[IMAGE_UPLOAD]: ", result.info);

          const info: CldUploadWidgetInfo = result.info;

          onChange(info.secure_url);
        }}
        options={{
          maxFiles: 1,
          maxFileSize: 5000000, // 5mb
        }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              src={value || "/placeholder.svg"}
              alt="Upload"
              className="rounded-lg object-cover"
              fill
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
