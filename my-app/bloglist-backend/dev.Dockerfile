FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --force

COPY . .

ENV NODE_ENV=development \
    PORT=3001

EXPOSE 3001

CMD ["npm", "run", "dev"]