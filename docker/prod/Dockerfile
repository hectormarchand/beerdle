FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build-only

FROM nginx:stable-alpine3.21 AS deploy

COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 8989
