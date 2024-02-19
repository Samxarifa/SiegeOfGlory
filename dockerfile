FROM node:18.18.2

WORKDIR /code

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --prod
RUN yarn add dotenv

COPY build build

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "node", "-r", "dotenv/config", "build" ]