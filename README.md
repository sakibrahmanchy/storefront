<p align="center">
  <h1>Store Management Backend</h1>
</p>

## Introduction

This is built on the shoulder of

- NodeJs, NestJs (https://nestjs.com/)
- TypeScript
- TypeORM (https://typeorm.io/)
- MySQL

## Local Development

For ease of local development a docker configuration is set up. For first time set up:

1. Set up docker in your pc if not installed(https://www.docker.com/products/docker-desktop)

2. Create .env file in root directory and put appropriate values in it
3. Install and build the project

```bash
// Set up docker in your pc if not installed
$ npm install
$ docker network create store
$ docker-compose build
$ docker-compose up
```

4. On another terminal run the following command:

```bash
$ docker-compose exec store_app npm run db:migrate
```

Your app should run in `3001` port locally (localhost:3001)

## Useful Commands

```bash
$ docker-compose exec a

// Generates a new migration
$ npm run db:generate <MigrationName>

// Run db migration
$ npm run db:migrate

// Reverts to previous migration
$ npm run db:revert

// Runs seed
$ npm run db:seed:run

```
