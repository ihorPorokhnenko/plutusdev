FROM node:14 AS builder

WORKDIR /usr/src/client

COPY . .

RUN npm install

RUN npm run-script build

EXPOSE 80

EXPOSE 443

# use this cmd until the project is production ready
# purpose of this script is to run greenlock in staging mode, so that it doesnt flood lets encrypt API with requests for real certificates
# it will run the server in staging mode and only request fake certificates
CMD ["npm", "run-script", "start-staging"]

#switch to this one when you are production ready
#CMD ["npm", "run-script", "start-prod"]