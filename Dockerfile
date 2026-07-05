# starts an image that is installed and running nodejs ver 20;
FROM node:20-alpine AS build
RUN apk add --no-cache curl
# sets the /app as the working dir inside the container;
WORKDIR /app 
# copy package and insure it runs first. takes advantage of docker layer;
COPY package*.json ./
# installs all dependeceis defined in package.json;
RUN npm ci
# copy the entire project into the container;
COPY . .


FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app .
EXPOSE 3000

CMD [ "node", "app.js" ]