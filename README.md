# nosql-practice
Repo for learning and test things with NoSQL

# Pre-requisites
Node and npm must be installed for installation and usage of the app. Node version used is 14.17.4
npm: https://www.npmjs.com/
node: https://nodejs.org/
nvm (to use the same version of node): windows: https://github.com/coreybutler/nvm-windows linux/mac: https://github.com/nvm-sh/nvm

# Installation
- install using `npm install`
- create an `.env` file using `.env.sample`as template. `MONGODB_URL` is the URL of your database in MongoDB.

# NVM
This project uses node 14.17.4, if you want to have multiple versions of node on your OS without them collinding you can use NVM. Documentation of installation and usage are in the links above.
After installation of the node version required the easiest way of setting it is:
- GNU-Linux/MacOS: `nvm use` will switch the actual node version to the one in `.nvmrc`
- Windows: `nvm use 14.17.4`, the windows version ignores the `.nvmrc` file completily, this is because is a different implementation of the GNU-Linux/MacOS one

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
