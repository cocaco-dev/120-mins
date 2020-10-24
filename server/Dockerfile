# stage 1: build
FROM node:12.18.3-alpine AS builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2 : run
FROM node:12.18.3-alpine 
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /usr/app/dist ./dist
COPY .env .

EXPOSE 4000

CMD ["npm", "start"]