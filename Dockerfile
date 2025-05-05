FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN NEXT_DISABLE_ESLINT=true npm run build # ✅ build step

EXPOSE 3000

CMD ["npm", "start"]