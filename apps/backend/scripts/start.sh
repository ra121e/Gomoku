#!/bin/sh
set -eu

bun scripts/wait-for-db.ts
bun run prisma:push -- --skip-generate
exec bun run start
