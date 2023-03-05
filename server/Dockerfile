FROM node:lts as builder

# Create app directory
WORKDIR /app

# Copy app files
COPY . .

# Install app dependencies
RUN yarn install

# Build the app
RUN yarn build

FROM node:lts-slim

# Create app directory
WORKDIR /app

# Copy production dependencies
COPY package.json yarn.lock ./

# Set environment to production
ENV NODE_ENV production

# Install production dependencies
RUN yarn install --production

# Copy built app
COPY --from=builder /app/dist ./dist

# Expose port 8080
EXPOSE 8080

# Run the app
CMD [ "node", "dist/main.js" ]
