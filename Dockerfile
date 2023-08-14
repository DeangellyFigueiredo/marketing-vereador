# Install dependencies only when needed
FROM docker.io/node:lts-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env.production .env
COPY ./prisma ./prisma
RUN npm install --force
RUN npx prisma generate --schema ./prisma/schema.prisma

FROM docker.io/node:lts-alpine as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV PORT 5555
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY --from=deps /usr/src/app/prisma ./prisma
COPY --from=deps /usr/src/app/.env ./.env
COPY ./dist .
RUN chown -R node:node .
USER node
EXPOSE 5555
CMD ["dumb-init", "node", "main.js"]
