import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

import { PrismaClient } from "../lib/generated/prisma/client";

export function createScriptDb() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaMariaDb(connectionString);
  return new PrismaClient({ adapter });
}
