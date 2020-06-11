# NestJS Conduit-Like API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Conduit (Medium clone) Api Overview

NestJS API Application that follows Medium.com (clone) API specs and guidelines:

- [Example App Repo](https://github.com/lujakob/nestjs-realworld-example-app)
- [Realword Repo](https://github.com/gothinkster/realworld)
- [API Specs](https://github.com/gothinkster/realworld/tree/master/api)
- [Nest JS API Doc using Swagger](https://github.com/nestjs/swagger)

This includes good practices and a "real world production build style and perspective".

## Getting Started

Clone the repo:

`git clone git@github.com:cgustav/learn_nest.git`

Switch to the repo folder:

`cd learn_nest/nest-conduit-api`

Install dependencies:

`npm install`

Copy required environment variable settings:

`cp src/config.example .env`

Create local database sync files folder:

`mkdir pgdata`

Compose docker from database images & start service :

`sudo docker-compose up -d`

Run App (development mode):

`npm run start:dev`

## API Specs

[Read API Specs](e2e/README.md)

## E2E Tests

Run E2E Test and ensure the API accomplish with all the API Specs:

### Run in bash

Execute `npm run test:e2e` command to run automated test on Linux environments. You can also add the customed script located on `/e2e/run-api-test.sh` (which runs a `newman` service in the background) into your CI/CD process.

### Run in Postman

Import `Conduit.postman_collection.json` from your [Postman] client and click "Run" automated tests.

**Note1:** You have to setup the following variables on your project configuration to get ready with the automated testing (right click on "Conduit" folder in your postman client, then choose "Edit" option and go to "Variables tab"):

```bash
APIURL=http://localhost:4000/api \
USERNAME=testuser \
EMAIL=user@test.com \
PASSWORD=password2
```

**Note2:** To improve the testing process you can set the `dropSchema: false,` property to `true,` in the `/src/database-connection.service.ts` configuration file. **DO NOT do this on production environments!**.

## Authentication

This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the Authorization header with Token scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

## Resources

- [Example code](https://github.com/kelvin-mai/nestjs-blog/)
- [Example tutorial video series](https://www.youtube.com/watch?v=AZfa-AFwjgo)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
