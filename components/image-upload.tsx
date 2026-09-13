import {
  CldUploadButton,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import Image from "next/image";
import { useTheme } from "next-themes";

import { useIsClient } from "@/hooks/use-is-client";
import { cn } from "@/lib/utils";

type ImageUploadProps = {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
};

const instanceOfCloudinaryUploadWidgetInfo = (
  object: unknown,
): object is CloudinaryUploadWidgetInfo => {
  return (
    typeof object === "object" && object !== null && "secure_url" in object
  );
};

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const { resolvedTheme } = useTheme();
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        className={cn(disabled && "outline-none ring-0 select-none")}
        onSuccess={(result) => {
          if (disabled) return;

          if (!instanceOfCloudinaryUploadWidgetInfo(result.info))
            return console.error("[IMAGE_UPLOAD]: ", result.info);

          onChange(result.info.secure_url);
        }}
        options={{
          maxFiles: 1,
          maxFileSize: 5000000, // 5mb
          resourceType: "image",
          clientAllowedFormats: ["image"],
          styles:
            resolvedTheme === "dark"
              ? {
                  palette: {
                    window: "#262626",
                    sourceBg: "#262626",
                    windowBorder: "#A3A3A3",
                    tabIcon: "#FFFFFF",
                    inactiveTabIcon: "#A3A3A3",
                    menuIcons: "#FFFFFF",
                    link: "#FFFFFF",
                    action: "#FFFFFF",
                    inProgress: "#00BFFF",
                    complete: "#33ff00",
                    error: "#EA2727",
                    textDark: "#262626",
                    textLight: "#FFFFFF",
                  },
                }
              : undefined,
        }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        <button
          disabled={disabled}
          aria-disabled={disabled}
          className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="relative h-40 w-40">
            <Image
              src={value || "/placeholder.svg"}
              alt="Upload"
              className="rounded-lg object-cover"
              fill
            />
          </div>
        </button>
      </CldUploadButton>
    </div>
  );
};
