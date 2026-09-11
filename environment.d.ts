// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // aiven db url
      DATABASE_URL: string;

      // cloudinary cloud name
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;

      // upstash redis url and token
      UPSTASH_REDIS_REST_URL: string;
      UPSTASH_REDIS_REST_TOKEN: string;

      // ai settings cookie encryption (user BYOK keys)
      AI_SETTINGS_COOKIE_NAME: string;
      VERIFICATION_SECRET: string;

      // stripe api secret key & webhook secret
      STRIPE_API_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;

      // next public app url
      NEXT_PUBLIC_APP_URL: string;
    }
  }
}
