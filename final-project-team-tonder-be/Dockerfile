FROM node:latest

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8888

CMD ["npm", "run", "start:prod"]
