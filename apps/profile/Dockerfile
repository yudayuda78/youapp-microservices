FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build profile

CMD ["node", "dist/apps/profile/main.js"]