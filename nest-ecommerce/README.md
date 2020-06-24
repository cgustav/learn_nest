<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Project Description

E-commerce web application

## Getting Started

Clone the repo:

`git clone git@github.com:cgustav/learn_nest.git`

Switch to the repo folder:

`cd learn_nest/nest-ecommerce`

Install dependencies:

`npm install`

Copy required environment variable settings:

`cp src/config.example .env`

Compose docker from docker-compose.yml & start database services :

`sudo docker-compose up --build -d`

Run App (development mode):

`npm run start:dev`

## Docker compose (& Environments)

## API Environment

In **development** mode run:

`npm run start:dev`

In **testing** mode run:

`npm run start:dev`

In **production** mode run:

`npm run start:prod`

**NOTE:** In case you are trying to run the application in **production** mode locally, you have to set up the `DATABASE_SERVICE_DNS=localhost` environment variable manually inside the `.env` file.

## Testing (TDD)

Currently this nestJS project is not configured to run unit testing projects or using built-in component base tests due to several issues related to mongoose module integration. You can only execute e2e tests, for more information you can explore the e2e test suits inside `./test` folder.

The components and API endpoints where designed following some of the TDD principles, so the writen tests can describe what the client should expect from valid requests.

In e2e (testing) mode execute (while nestJS is running):

`npm run test:e2e`

**NOTE:** Due to the actual MongoDB instance configuration and user permissions, you have to run e2e tests in test mode (running `npm run:test` in the background), please check your environment variables inside your `.env` file.

## Database Environments & Deploy

To deploy a MongoDB replica set to work with the application:

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and configure manually your first mongo replica set in sandbox mode (for free version).
2. Go to your replica set configuration and add to your connection IPs whitelist a `0.0.0.0` ip address (to allow connections from anywhere)
3. Generate your user connection credentials and store it inside the `app.yaml` or any other deployment/env file. Make sure to configure `DATABASE_SERVICE_USERNAME`, `DATABASE_SERVICE_PASSWORD`, `DATABASE_DB` and `DATABASE_SERVICE_DNS` environment constants.
4. Run your app in production mode

## GCP Deploy

This project is pre configured to be deployed on a Google Clouc Platform application project.

1. Make sure that you already have installed [Gcloud CLI tool](https://cloud.google.com/sdk/install) on your local machine.

2. Also make sure you are logged in with a valid google account with access to Google Cloud Platform services, use `gcloud auth login` and `gcloud auth list` to do so.

3. Select a previously created GCP application project on [GCP console](), run `gcloud config set project <project id>` and `gcloud config list` commands.

4. Create a valid GCP configuration file running `cp app.example app.yaml` command. The specified env_variables are important to connect successfully with the production database. Feel free to change values if you choose to use different mongoDB connection credentials.

5. Deploy using `gcloud app deploy` and choose your preferred region to host your application.

6. Once the app is deployed you can quickly push new changes by running `npm run deploy`.

## Project Learning Goals

- Role Based Authentication [x]
- NoSQL Database, in this case, MongoDB [x]
- Explore testing [x]
- Explore Deployment/DevOPs [x]
- React/Redux fontend in TypeScript [ ]
- React Hooks [ ]
- Nest Interceptors [x]
- e2e with NestJS concepts [x]
- Test Driven Development [x]
- SSR with NextJS [ ]

## Resources

- [NestJS Interceptors](https://docs.nestjs.com/interceptors)
- [NestJS Custom Decorators](https://docs.nestjs.com/custom-decorators)
- [NestJS MongoDB Integration](https://docs.nestjs.com/techniques/mongodb)
- [NestJS Mongoose Recipes](https://docs.nestjs.com/recipes/mongodb)
- [NestJS Loggers](https://docs.nestjs.com/techniques/logger)
- [NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Youtube tutorial video serie](https://www.youtube.com/watch?v=-8Q62rTswSQ&list=PLBeQxJQNprbiykCyVNcSExTgytMMjSjnQ)
- [Tutorial Repo](https://github.com/kelvin-mai/nest-commerce)
- [GCLoud CLI](https://cloud.google.com/sdk/docs/initializing)
- [Authentication on MongoDB](https://medium.com/mongoaudit/how-to-enable-authentication-on-mongodb-b9e8a924efac)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Docker Compose Guide](https://gabrieltanner.org/blog/docker-compose)
- [Docker Compose Docs](https://docs.docker.com/compose/gettingstarted/)
- [Docker Compose Medium Article](https://medium.com/rate-engineering/using-docker-containers-to-run-a-distributed-application-locally-eeabd360bca3)
- [Managing MongoDB with Docker Compose](https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3)
- [Introduction to TDD](http://agiledata.org/essays/tdd.html)
- [TDD Medium Article by Eric Elliott](https://medium.com/javascript-scene/tdd-changed-my-life-5af0ce099f80)
- [TDD Medium Article by Eric Elliott 2](https://medium.com/javascript-scene/testing-software-what-is-tdd-459b2145405c)
- [TDD Medium Article by Sylvain Saurel](https://medium.com/hackernoon/introduction-to-test-driven-development-tdd-61a13bc92d92)
- [e2e Testing Katalon Article](https://www.katalon.com/resources-center/blog/end-to-end-e2e-testing/)
