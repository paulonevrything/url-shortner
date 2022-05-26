FROM node:16-slim

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8080

# start app
CMD ["npm", "run", "serve"]