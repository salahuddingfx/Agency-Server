# Build Stage
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /usr/src/app/config ./config
COPY --from=builder /usr/src/app/controllers ./controllers
COPY --from=builder /usr/src/app/routes ./routes
COPY --from=builder /usr/src/app/models ./models
COPY --from=builder /usr/src/app/middlewares ./middlewares
COPY --from=builder /usr/src/app/services ./services
COPY --from=builder /usr/src/app/validators ./validators
COPY --from=builder /usr/src/app/helpers ./helpers
COPY --from=builder /usr/src/app/app.js ./app.js
COPY --from=builder /usr/src/app/server.js ./server.js

ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

CMD ["node", "server.js"]
