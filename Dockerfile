FROM node:7-alpine

ENV NODE_ENV production
ENV SLACK_APP_ID 16958440739.169826916213
ENV SLACK_APP_SECRET 0e66e436271d511cb4bf499c2854e03a
ENV SLACK_APP_CHANNEL @stan

EXPOSE 3010

RUN mkdir /app
RUN chown node:node /app
WORKDIR /app

USER node

COPY . /app
RUN yarn && yarn build

CMD ["yarn", "start"]
