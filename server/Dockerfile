FROM node:lts as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:lts-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

ENV NODE_ENV production

RUN yarn install --production

COPY --from=builder /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]