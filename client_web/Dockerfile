# Etape 1 : construire le code React
FROM node:lts as build

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

# Etape 2 : héberger le site React
FROM node:lts

WORKDIR /app

COPY --from=build /app/build .

RUN npm install -g serve

EXPOSE 8081

CMD ["serve", "-s", ".", "-l", "8081"]
