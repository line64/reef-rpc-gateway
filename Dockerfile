FROM node:6

ADD ./package.json /app/package.json

WORKDIR /app

RUN npm install --production

ADD ./dist /app/dist

CMD [ "node", "dist/index.js" ]
