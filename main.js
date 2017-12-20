const db = require('./server/db/models');
const app = require('./server');
const PORT = process.env.PORT || 3000; // this can be useful if you deployt to Heroku
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
