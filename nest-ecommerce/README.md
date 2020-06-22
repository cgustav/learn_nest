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

Compose docker from docker-compose.yml & start all services :

`sudo docker-compose up --build -d`

Run App (development mode):

`npm run start:dev`

## API Environment

In development mode run:

`npm run start:dev`

In e2e (testing) mode run:

`npm run test:e2e`

WIP

## Project Learning Goal

- Role Based Authentication
- NoSQL Database, probably MongoDB
- Explore testing
- Explore Deployment/DevOPs
- React/Redux fontend in TypeScript
- React Hooks
- SSR with NextJS
