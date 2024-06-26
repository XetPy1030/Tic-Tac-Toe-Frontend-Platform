FROM node:18-alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN npm install -g --force yarn

RUN yarn install --frozen-lockfile

COPY . .

CMD ["npm", "start"]
