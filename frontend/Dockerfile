FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
ENV SKIP_PREFLIGHT_CHECK=true
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27-alpine

# Copy built React app
COPY --from=build /app/build /usr/share/nginx/html

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy your nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# OpenShift compatibility: set permissions for non-root user
RUN chgrp -R 0 /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chmod -R g+rwX /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chown -R nginx:0 /var/cache/nginx /var/run /var/log/nginx /etc/nginx/conf.d

EXPOSE 8080
USER nginx
