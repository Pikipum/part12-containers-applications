FROM node:20 AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force

FROM node:20
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 3001
CMD ["node", "index.js"]