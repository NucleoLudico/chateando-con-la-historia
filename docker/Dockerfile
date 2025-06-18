# Imagen base
FROM node:18

WORKDIR /app

COPY backend/package.json backend/package-lock.json* ./
RUN npm install --production

COPY backend ./

CMD ["node", "src/app.js"]
