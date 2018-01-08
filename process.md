#App Boiler Maker Process

###Initial Step
  1. npm init -y
  2. git init
  3. .gitignore
      ...1. node_modules
      ...2. bundle.js
      ...3. bundle.js.map
  4. webpack.config.js (copy and paste!)

###File setup
  ####0. main.js --> where backend is launched
  ####1. app

        ...1. main.js
        ...2. store.js
        ...3. components
        ...4. reducers
          ...1. rootReducers
  ####2. node_modules
  ####3. public
        ...1. index.html
  ####4. server
        ...1. index.js
        ...2. api
            ...1. index.js
            ...2. route1.js
        ...3. db
            ...1. index.js --> establish DB connection (to postgres or Heruku)
            ...2. models
                ...1. index.js --> ensure all subModels required & make associations & export this to main.js
                ...2. Model1.js
  ####5. .gitignore
  ####6. package.json
  ####7. webpack.config.js

###EXPRESS - DB SYNC and APP LISTEN - main.js
  1. installations
    ...1. db
    ...2. app

  ```javascript
    const db = require('./server/db/models');
    const app = require('./server');
    const PORT = process.env.PORT || 3000; //Heruku related
    const chalk = require('chalk');

    db.sync({force: true})
    .then(() => {
      console.log(chalk.magenta(`DB was synced.... @ ${__dirname}`))
      app.listen(PORT, () => {
        console.log(`app is listening on port ${PORT}`)
      })
    })
  ```

###EXPRESS - APP (server/index.js)
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
    ...11. chalk

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

###EXPRESS-ROUTES installations
  ####mainRoute (within server/api/index.js)
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
  ####subRoutes (within server/api/route1.js)
  ...1. express
  ...2. module.export subRouter

  ```javascript
  const router = require('express').Router();
  module.exports = router;

  //api/route1/
  router.get('/' (req, res, next) => {
    // send whatever was gotten
  })

  //api/route1/
  router.post('/', (req, res, next) => {
    // send whatever was created
  })

  // api/route1/:routerId
  router.put('/:routeId', (req, res, next) => {
    // send whatever was updated
  })

  //api/route1/:routerId
  router.delete('/:routeId', (req, res, next) => {
    // send status when item removed
  })
  ```

###DB intialization (create Sequelize instance) (db/index.js)
  1. installations
  ...1. createDb `nameOfDb`

  2. Main Database initialization...
  ```javascript
  const chalk = require('chalk')

  console.log(chalk.blue(`Database connection established.....${__dirname}`))

  const Sequelize = require('sequelize');
  module.exports = new Sequelize(process.env.DATABASE_ENV || `postgres://localhost/5432/${nameOfDb}`);
  ```
### DB homebase (db/models/index.js)
  1. installations
    ...1. db (from initialized db instance)
    ...2. sub models (if no associations needed, just require models, this ensures that those files are ran)
    ...3. associations
    ...4. export db (this is what we will sync)

  ```javascript
  const db = require('../index')
  const Model1 = require('./Model1');
  const Model2 = require('./Model2');
  require('./Model3');

  // associations....
  Model1.belongsto(Model2);
  Model2.hasMany(Model1);

  module.exports = db // exporting the same db instance with these tabels and associations made
  ```
### DB Model Definitions (db/models/model1.js)
  1. installations
    ...1. Sequelize
    ...2. db (from initialized db instance)

  ```javascript
  const Sequelize = require('sequelize');
  const db = require('../index');

  module.export = db.define('model1', {
    // etc model definitions example....
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }
    }
  })
  ```
###APP
  1. installations (regular dependencies)
    ...1. react
    ...2. react-dom
    ...3. react-router-dom
    ...4. redux
    ...5. react-redux
    ...6. redux-thunk
          https://github.com/gaearon/redux-thunk
    ...7. redux-logger
          https://github.com/evgenyrodionov/redux-logger
    ...8. axios

  2. installations (devDependencies) npm install --save-dev (-D)
      ...1. webpack
      ...2. babel-core
      ...2. babel-loader
      ...3. babel-preset-react
      ...4. babel-preset-env

  ####main.js (using react-redux Provider and store)
  ```javascript
  import React from 'react';
  import { render } from 'react-dom';
  import Provider from 'react-redux';
  import store from './store';

  render(
    <Provider store={store}>
      <div>Testing...</div>
    </Provider>
    ,document.getElementById(`${initialStartingIdInHTML}`)
  )
  ```

  ####store.js
  ```javascript
  import { createStore, applyMiddleware } from 'redux';
  import { loggingMiddleware } from 'redux-logger';
  import { thunkMiddleware } from 'redux-thunk';
  import rootReducer from './reducers/rootReducer'

  export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggingMiddleware));
  ```

  ####rootReducer.js
  ```javascript
  import { combineReducer } from 'redux';
  import { `${otherReducer}` } from './otherReducer';

  const rootReducer = combineReducer({
    otherReducers: otherReducer
  })

  export default rootReducer
  ```

  ####otherReducer.js
    1. initialState
    2. action TYPE (variable)
    3. action creator
    4. THUNK action creator generates a function that can be dispatched because we are using `redux-thunk`
    5. Reducer func (takes in state and an action)

```javascript
import axios from 'axios';

// initial state
const initialState = [];

// action type
const GOT_STUDIOS = 'GOT_STUDIOS';

// action creator
const gotStudios = studios => {
  const action = {
    type: GOT_STUDIOS,
    studios
  };
  return action
};

// thunk action creator
export function fetchStudios () {
  return thunkFunc (dispatch) => {
    return axios.get('/api/studios')
    .then(res => res.data)
    .then(studios => dispatch(gotStudios(studios)))
    .catch(console.error)
  }
}

//reducer
const studioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_STUDIOS:
      return action.studios;
  }
}
export default studioReducer;
```

###CSS
  1. installations (npm install --D)
    ...1. style-loader
    ...2. css-loader
