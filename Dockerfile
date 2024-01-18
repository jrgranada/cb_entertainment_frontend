# Install dependencies only when needed
FROM node:18.14.1-alpine3.16 AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Rebuild the source code only when needed
FROM node:18.14.1-alpine3.16 AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN SPOTIFY_CLIENT_ID=APP_SPOTIFY_CLIENT_ID SPOTIFY_CLIENT_SECRET=APP_SPOTIFY_CLIENT_SECRET NEXTAUTH_SECRET=APP_NEXTAUTH_SECRET npm run build

# Production image, copy all the files
FROM node:18.14.1-alpine3.16 AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

USER nextjs

EXPOSE ${APP_PORT}

ENTRYPOINT ["sh","/app/entrypoint.sh"]

CMD [ "npm", "start" ]