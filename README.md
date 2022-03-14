# nosql-practice
Repo for learning and test things with NoSQL

# Pre-requisites
Node and npm must be installed for installation and usage of the app.
npm: https://www.npmjs.com/
node: https://nodejs.org/
nvm (to use the same version of node): windows: https://github.com/coreybutler/nvm-windows linux/mac: https://github.com/nvm-sh/nvm

# Installation
- install using `npm install`
- create an `.env` file using `.env.sample`as template. `MONGODB_URL` is the URL of your database in MongoDB.

# NVM
This project uses a node version specified in the `.nvmrc` file, if you want to have multiple versions of node on your OS without them collinding you can use NVM. Documentation of installation and usage are in the links above.
After installation of the node version required the easiest way of setting it is:
- GNU-Linux/MacOS: `nvm use` will switch the actual node version to the one in `.nvmrc`
- Windows: `nvm use <version in .nvmrc>`, the windows version ignores the `.nvmrc` file completily, this is because is a different implementation of the GNU-Linux/MacOS one

# Usage
In your favourite terminal run `npm run start`, this initiates the app. The port where the app starts has to be defined in the `.env` file, you can see what other variables are necessary checking the `.env.sample` file. To see examples of usage you can check the Postman collection file at the root folder of the project

Routes available are:
- `GET /health`: checks if the app is connected to the database
- `POST /questionnaires/create`: request for questionnaire creation
- `GET /questionnaires/:id`: get the questionnaire with `:id` associated. Returns error if it doesn't exists
- `POST /students/createStudent`: request for student creation
To see requeriments of each model you can watch at the models in the code

# Contributing
PRs accepted.

# License
MIT © Agustin Sly
