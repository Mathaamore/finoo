FROM node:18.15.0

COPY ./.env /app/.env
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./src /app/src

WORKDIR /app

RUN npm install

CMD ["npm", "run", "dev"]