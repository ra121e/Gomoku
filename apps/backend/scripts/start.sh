#!/bin/sh
set -eu

node scripts/wait-for-db.js
npm run prisma:push
npm run start
