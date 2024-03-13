FROM node:18.18.2

WORKDIR /code

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN corepack enable pnpm
RUN pnpm install -P
RUN pnpm add dotenv

COPY build build

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "node", "-r", "dotenv/config", "build" ]