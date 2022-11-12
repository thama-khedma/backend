FROM node:alpine


WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci

COPY . .

EXPOSE 9090 

CMD [ "node", "server.js" ]


