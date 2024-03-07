FROM node:18.15.0

COPY ./ /app

WORKDIR /app

RUN npm install

CMD ["npm", "run", "start"]