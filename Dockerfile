FROM node:18-alpine AS build

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
COPY . .
RUN pnpm i --frozen-lockfile
RUN pnpm run build

FROM node:18-alpine AS deploy-node

WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/build .
CMD ["node", "index.js"]
