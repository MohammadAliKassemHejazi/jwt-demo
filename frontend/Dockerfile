FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
ENV SKIP_PREFLIGHT_CHECK=true
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27-alpine

# Copy built files
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# OpenShift compatibility: Run as non-root user
RUN chgrp -R 0 /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chmod -R g+rwX /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    rm /etc/nginx/conf.d/default.conf

# Create nginx.conf that works with OpenShift
RUN echo 'server { \n\
  listen 8080; \n\
  server_name _; \n\
  root /usr/share/nginx/html; \n\
  index index.html; \n\
  location / { \n\
    try_files $uri /index.html; \n\
  } \n\
  location /api/ { \n\
    proxy_pass http://backend:8080; \n\
    proxy_http_version 1.1; \n\
    proxy_set_header Host $host; \n\
    proxy_set_header X-Real-IP $remote_addr; \n\
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \n\
    proxy_set_header X-Forwarded-Proto $scheme; \n\
  } \n\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080
USER nginx
