FROM node:20-alpine

WORKDIR /app

RUN npm install --save cross-env

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npx", "cross-env", "NODE_ENV=production", "node", "dist/main.js"]
