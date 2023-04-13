# Image source
FROM node:alpine

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY package*.json .

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . .

CMD ["npm", "run", "start:dev"]
