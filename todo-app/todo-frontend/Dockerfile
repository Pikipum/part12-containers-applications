FROM node:20 AS build
WORKDIR /usr/src/app
ENV VITE_BACKEND_URL=/api
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]