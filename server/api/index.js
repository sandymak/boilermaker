'use strict';
const apiRouter = require('express').Router();

apiRouter.get('/hello', (req, res, next) => {
  res.send({hello: 'world'})
});

// You can put all routes in this file; HOWEVER, this file should almost be like a table of contents for the routers you create

apiRouter.use('/studio', require('./studio.js'));
apiRouter.use('/movie', require('./movie.js'));

apiRouter.use((req, res, next) => {
  const err = new Error('Womp womp! Page not found :(');
  err.status = 404;
  next(err);
})

module.exports = apiRouter;

