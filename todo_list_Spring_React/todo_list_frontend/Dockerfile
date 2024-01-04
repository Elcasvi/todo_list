#This instruction pushes the base image from a remote repository
FROM node:18-alpine as build

#This command sets the working directory for any commands you add in the Dockerfile
WORKDIR /app

#These instructions will copy the files we need into the working directory. We only need the public and src folders
COPY package*.json .

#This instruction will install the dependencies for the project
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html


