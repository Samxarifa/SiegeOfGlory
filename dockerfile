FROM node:18.18.2 AS build-stage
WORKDIR /code
RUN corepack enable pnpm
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install
COPY . .
COPY .env .
RUN pnpm run build

FROM node:18.18.2
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN corepack enable pnpm
RUN pnpm install -P
RUN pnpm add dotenv
COPY --from=build-stage /code/build build
EXPOSE 3000
ENV NODE_ENV=production
ENV TZ=Europe/London
CMD [ "node", "-r", "dotenv/config", "build" ]