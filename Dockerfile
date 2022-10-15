FROM node
RUN mkdir -p /usr/src/app
RUN mkdir .aws
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm ci --only=production
COPY . /usr/src/app
EXPOSE 80
CMD [ "npm", "start" ]