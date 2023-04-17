FROM node:18-alpine as dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

FROM node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --only=dev
COPY . .
RUN npm run build

FROM node:18-alpine as prod
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json .env ./
RUN npm install --only=prod
CMD ["npm", "run", "start"]
