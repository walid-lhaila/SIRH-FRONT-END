FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --no-audit --no-fund --timeout=60000

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]

