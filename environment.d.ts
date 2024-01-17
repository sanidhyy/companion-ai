// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // aiven db url
      DATABASE_URL: string;

      // cloudinary cloud name
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    }
  }
}
