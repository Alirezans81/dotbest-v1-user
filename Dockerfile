FROM docker.arvancloud.ir/node:20-alpine

WORKDIR /app


COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

RUN npm ci

CMD ["npm", "run", "server"]
