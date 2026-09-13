import type { Context } from "@netlify/functions";
import { Redis } from "@upstash/redis";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_request: Request, _context: Context) => {
  try {
    const redis = Redis.fromEnv();
    await redis.ping();

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error("[REDIS_KEEPALIVE]: ", error);
    return new Response("Internal Error", { status: 500 });
  }
};
