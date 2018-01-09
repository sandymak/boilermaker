const db = require('./server/db/models');
const app = require('./server');
const PORT = process.env.PORT || 3000; // this can be useful if you deploy to Heroku

// NOTE ==> Production Environment
// 1) in terminal before running app, type export VARIABLE='secret'
// 2) to access the variable, type `printenv`

const chalk = require('chalk');

// initializing the app

db.sync( {
  force: true
})
.then(() => {
  console.log(chalk.magenta(`DB was synced..... @ ${__dirname} `))
  app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
  });
});
