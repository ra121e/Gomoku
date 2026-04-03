import "./load-env";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "../generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
  var prismaPool: Pool | undefined;
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined.");
}

const pool =
  globalThis.prismaPool ??
  new Pool({
    connectionString: databaseUrl,
    connectionTimeoutMillis: 5000,
  });

const adapter = new PrismaPg(pool);

export const prisma = globalThis.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaPool = pool;
  globalThis.prisma = prisma;
}
