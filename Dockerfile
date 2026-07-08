FROM node:20-alpine AS development
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . /app
# changes the user from root to node
RUN chown -R node:node /app
USER node
CMD ["npm", "run", "dev"]

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY . /app
EXPOSE 3000
# changes the user from root to node
RUN chown -R node:node /app
USER node
CMD [ "node", "app.js" ]