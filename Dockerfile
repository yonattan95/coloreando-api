FROM node:14

WORKDIR /var/api

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node", "src/index.js" ]