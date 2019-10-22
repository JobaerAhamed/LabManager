FROM node:10.15.1
RUN mkdir /app
WORKDIR /app
ADD . /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm start" ]
ENTRYPOINT [ "sh", "-c" ]
