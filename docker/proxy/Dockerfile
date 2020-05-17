FROM node:12
RUN mkdir -p /app
WORKDIR /app
COPY ./proxy/package*.json ./
RUN npm ci -qy
COPY ./proxy .
EXPOSE 8082
CMD [ "npm", "run", "start" ]
