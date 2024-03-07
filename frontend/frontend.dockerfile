FROM node:18.15.0

COPY . /app
WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_ENV

RUN echo "NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}" > /.env && \
    echo "NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV}" >> /.env

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
