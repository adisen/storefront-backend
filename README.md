# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root.

## Technologies

Some of the technologies used in this application includes:

- Express
- JSON Web Token
- BCrypt
- PostgreSQL
- NodeJS
- Jasmine

## Steps to SetUp and Run Application

First you need to rename your .env-example file to .env to setup the environment variables

### Database Setup

- Make Sure that you have Postgres Installed on your local machine
- Create two DBs (one for dev and one for test) i.e storefront and storefront_test
- Update your .env file with the corresponding data
- Run `db migrate up` to apply DB migrations to your DB

### Environment Variables

Make sure to fill in the rest of the environment variables as appropriate

### Available Commends

1. Run Application:
   ```bash
    localhost@user ~ npm run watch
   ```
   Application runs on: `localhost:3000`
2. Run Tests
   ```bash
    localhost@user ~ npm test
   ```
   To
