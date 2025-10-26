FROM docker.arvancloud.ir/node:20-alpine

WORKDIR /app


COPY package*.json .

RUN npm install

COPY . .

<<<<<<< HEAD
EXPOSE 3001
=======
EXPOSE 80
>>>>>>> 1b66a0e676f4313f32c94cd4c3cfb861142ef026

RUN npm ci

CMD ["npm", "run", "server"]
