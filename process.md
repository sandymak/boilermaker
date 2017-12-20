#App Boiler Maker Process

###Initial Step
  1. npm init -y
  2. git init
  3. .gitignore
      ...1. node_modules
      ...2. bundle.js
      ...3. bundle.js.map


###File setup
    #####...1. app
            ...1. index.js
    ######...2. node_modules
    ######...3. public
            ...1. index.html
    #####...4. server
            ...1. index.js
            ...2. api
                ...1. index.js
                ...2. route1.js
                ...3. route2.js
            ...3. db
                ...1. index.js
                ...2. models
                    ...1. subModel.js
  ####2. .gitignore
  ####3. package.json

###EXPRESS
  1. installations (general)
    ...1. express
    ...2. morgan
    ...3. body-parser
    ...4. path
    ...5. `api`
    ...6. `sendFile`
    ...7. `error-handling`
    <!-- If you want to use Sequelize -->
    ...8. sequelize
    ...9. pg@7.4.0
    ...10. pg-hstore

  2. installations (dev-dependencies) (`--save-dev` or -D)
    ...1. morgan

  ```javascript
  const express = require('express');
  const app = express();
  const morgan = require('morgan');
  const bodyParder = require('body-parser');
  const path = require('path');

  app.use(morgan('dev'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use(express.static(path.join(__dirname, '../public')));

  app.use('/api', require('./api'));

  // send index.html if route doesn't match any of our API routes
  app.get('*', (req.res, next) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

  app.use((err, req, res, next) => {
    console.error(err);
    // this will give you where is the err?
    console.error(err.stack);
    res.status(err.status || 505).send(err.message || 'Internal server error')
  })
  ```

###EXPRESS-ROUTES installations (within api/index.js)
  1. mainRoute
    ...1. express
    ...2. require sub routes
    ...3. module.export apiRouter

  ```javascript
  const apiRouter = require('express').Router();
  // subRouter
  apiRouter.use('/route1', require('./route1.js'))

  // 404 error to ensure correct routes typed by client
  apiRouter.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
  })
  module.exports = apiRouter
  ```
  2. subRoutes
    ...1. express
    ...2. module.export subRouter

  ```javascript
  const router = require('express').Router();
  module.exports = router;

  //api/router1/
  router.get('/' (req, res, next) => {
    // send whatever was gotten
  })

  //api/router1/
  router.post('/', (req, res, next) => {
    // send whatever was created
  })

  // api/router1/:routerId
  router.put('/:routerId', (req, res, next) => {
    // send whatever was updated
  })

  //api/router1/:routerId
  router.delete('/:routerId', (req, res, next) => {
    // send status when item removed
  })
  ```

###DB
  1. installations
  ...1. createDb `nameOfDb`

  2. Main DB
  ```javascript
  const Sequelize = require('sequelize');
  const db = new Sequelize(`postgres://localhost/5432/${nameOfDb}`);

  module.exports = db;
  ```

