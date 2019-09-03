FROM node:11-alpine

RUN mkdir -p /usr/src/pipepay
WORKDIR /usr/src/pipepay

# Install Modules
COPY package.json /usr/src/pipepay/
RUN npm install

# Bundle app source
COPY src /usr/src/pipepay/src
COPY config.dev.js /usr/src/pipepay/

RUN npm run build

ARG PAYSTACK_SECRET
ARG PAYSTACK_PUBLIC_KEY
ARG COGNITO_AUD
ARG COGNITO_USER_POOL_ID
ARG ZOHO_EMAIL
ARG ZOHO_PASSWORD
ARG DB_USER=$DB_USER
ARG DB_PASSWORD
ARG JWT_SECRET
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_KEY

EXPOSE 3000

CMD ["npm", "start"]