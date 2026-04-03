import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const rootEnvPath = resolve(currentDirectory, "../../.env");

config({ path: rootEnvPath, override: false });

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
