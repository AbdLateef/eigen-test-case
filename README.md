# Mini Library API - Eigen Backend Test Case

## Installation
```
npm install
```
## Database Migration
This app is using [Knex](https://knexjs.org/) as a database SQL query builder. Run the following command to migrate the database and seeder.
```
knex migrate:latest
```
```
knex seed:run
```
## Run the App
Just simply running this command below:
```
npm start
```
## API documentation
The swagger API documentation is running in path "/". This can be accessed by using the URL below in the browser. Make sure you run the App first.
```
localhost:3001
```
## Unit Testing
The jest has been added to this App. So, just simply run
```
npm test
```
For some reasons there is an issue where the super test return 404 instead of 200 during the endpoint test, even though it's running as expected in the Postman.
To get update more about this issue, you can follow this [github forum](https://github.com/ladjs/supertest/issues/255)
