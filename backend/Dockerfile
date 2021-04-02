FROM node:14.16.0

WORKDIR /usr/myapp

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "prod"]
