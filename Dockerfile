FROM node:7-alpine

ENV NODE_ENV production

EXPOSE 3010

RUN mkdir /app
RUN chown node:node /app
WORKDIR /app

USER node

COPY . /app
RUN yarn && yarn build

CMD ["yarn", "start"]
