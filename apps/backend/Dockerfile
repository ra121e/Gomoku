FROM node:20-bookworm-slim

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=postgresql://transcendence:transcendence@database:5432/transcendence?schema=public

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN npm install

COPY . .
RUN npm run prisma:generate
RUN npm run build
RUN chmod +x scripts/start.sh

EXPOSE 3001

CMD ["./scripts/start.sh"]
