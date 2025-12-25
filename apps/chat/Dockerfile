FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build chat

CMD ["node", "dist/apps/chat/main.js"]