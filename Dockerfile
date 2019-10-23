FROM node:12

RUN mkdir -p /usr/src/pipepay
WORKDIR /usr/src/pipepay

# Install Modules
COPY package.json /usr/src/pipepay/
RUN npm install

# Bundle app source
COPY src /usr/src/pipepay/src
COPY config.stage.js /usr/src/pipepay/
COPY config.dev.js /usr/src/pipepay/
COPY .env /usr/src/pipepay/

ARG COGNITO_AUD
ARG COGNITO_USER_POOL_ID
ARG ACCESS_KEY_ID
ARG SECRET_KEY
ARG JWT_SECRET
ARG PAYSTACK_SECRET
ARG PAYSTACK_PUBLIC_KEY
ARG ZOHO_EMAIL
ARG ZOHO_PASSWORD
ARG DB_HOST
ARG DB_PASSWORD
ARG DB_USER

RUN npm run stage

EXPOSE 4545
EXPOSE 4646
EXPOSE 9229

CMD ["npm", "start"]
