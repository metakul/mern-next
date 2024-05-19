FROM node:20
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN npm install -f
COPY . .
RUN npm run build
CMD ["npm", "start"]