'use strict';
const chalk = require('chalk');
const Sequelize = require('sequelize')

// double-checking to make sure DB is connected
console.log(chalk.blue(`Opening database connection.....@ ${__dirname} `));

// If you are using Heroku as a deployment service and Heroku Postgres as your database, remember that the database url in your Heroku environment will be available in an environment variable DATABASE_URL. Prepare your sequelize instance to take advantage of this, and only use your local database url if no DATABASE_URL is available.

module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilermaker', {
  logging: false
});
// other options to play with here...

