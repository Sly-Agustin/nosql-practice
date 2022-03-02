# nosql-practice
Repo for learning and test things with NoSQL

# Pre-requisites
Node and npm must be installed for installation and usage of the app. Node version used is 14.17.4
npm: https://www.npmjs.com/
node: https://nodejs.org/

# Installation
- install using `npm install`
- create an `.env` file using `.env.sample`as template. `MONGODB_URL` is the URL of your database in MongoDB.

# Usage
In your favourite terminal run `npm run start`, this initiates the app. In case you are running in a local environment usually the app will initiate in `127.0.0.1:3000`

Routes available are:
- `/health`: checks if the app is connected to the database
- `/questionnaires/create`: post request where you can create a questionnaire
- `/questionnaires/:id`: get the questionnaire with `:id` associated. Returns error if it doesn't exists
- `/students/createStudent`: post request where you can create a student
To see requeriments of each model you can watch at the models in the code

# Contributing
PRs accepted.

# License
MIT © Agustin Sly
