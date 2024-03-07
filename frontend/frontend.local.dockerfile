FROM node:18.17.0

COPY ./package.json /app/package.json

WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_ENV

RUN echo "NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}" > /.env && \
    echo "NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV}" >> /.env

RUN npm install

CMD ["npm", "run", "dev"]
