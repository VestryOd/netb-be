# use lightweight image with Node.js
FROM node:18-alpine

# set up work dir inside the container
WORKDIR /app

# copy files package.json & package-lock.json
COPY package*.json ./

# install depencies
RUN npm ci

# copy all codabse tinto the container
COPY . .

# open port on which the app will be working
EXPOSE 4001

# run nodemon locally.
# for production use "npm start".
CMD ["npm", "run", "start:dev"]