FROM node:19.4.0

WORKDIR /myfolder/
COPY ./package.json /myfolder/
COPY ./yarn.lock /myfolder/
Run yarn install

COPY . /myfolder/
CMD yarn start:dev