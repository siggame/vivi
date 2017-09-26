FROM node:slim

RUN mkdir -p /usr/src/app/release
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build:dist

CMD ["node", "."]