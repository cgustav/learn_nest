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

`git clone git@github.com:cgustav/learn_nest/nest-conduit-api.git`

Switch to the repo folder:

`cd nest-conduit-api.git`

Install dependencies:

`npm install`

Copy required environment variable settings:

`cp src/config.example .env`

Create local database docs directory:

`mkdir pgdata`

Compose database docker images:

`sudo docker-compose up -d`

Start service (development mode):

`npm run start:dev`

## Database

soon...

## Authentication

This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the Authorization header with Token scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

## Resources

- [Example code](https://github.com/kelvin-mai/nestjs-blog/)

