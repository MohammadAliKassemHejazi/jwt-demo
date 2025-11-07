FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
ENV SKIP_PREFLIGHT_CHECK=true
RUN npm install   # <-- use install, not `npm ci`
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
