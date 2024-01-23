// This file is needed to support autocomplete for process.env
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // aiven db url
      DATABASE_URL: string;

      // cloudinary cloud name
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;

      // pinecone vector db credentials
      PINECONE_INDEX: string;
      PINECONE_API_KEY: string;

      // upstash redis url and token
      UPSTASH_REDIS_REST_URL: string;
      UPSTASH_REDIS_REST_TOKEN: string;

      // open ai key
      OPENAI_API_KEY: string;

      // replicate api token
      REPLICATE_API_TOKEN: string;

      // stripe api secret key
      STRIPE_API_SECRET_KEY: string;

      // next public app url
      NEXT_PUBLIC_APP_URL: string;
    }
  }
}
