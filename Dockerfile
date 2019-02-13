FROM node:10-alpine

ENV NODE_ENV production

EXPOSE 3010

RUN mkdir /app
COPY . /app
RUN chown -R node:node /app

WORKDIR /app

USER node

RUN yarn && yarn build

CMD ["yarn", "start"]
