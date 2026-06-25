# starts an image that is installed and running nodejs ver 20;
FROM node:20-alpine

# sets the /app as the working dir inside the container;
WORKDIR /app 

# copy package and insure it runs first. takes advantage of docker layer;
COPY package*.json ./

# installs all dependeceis defined in package.json;
RUN npm install

# copy the entire project into the container;
COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]