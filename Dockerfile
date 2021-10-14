FROM node:14-alpine
RUN mkdir /app
WORKDIR /app
ADD . /app

EXPOSE 3001
EXPOSE 3306

RUN npm install

CMD [ "npm run start:prod" ]
ENTRYPOINT [ "sh", "-c" ]