FROM docker.arvancloud.ir/node:20-alpine

WORKDIR /app


COPY package*.json .

RUN npm install

COPY . .

EXPOSE 80

RUN npm ci

CMD ["npm", "run", "server"]
