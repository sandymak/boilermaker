'use strict';
const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// logging middleware
app.use(morgan('dev'));

// body-parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// express static file serving middleware
app.use(express.static(path.join(__dirname, '../public')));

// include our routes!
app.use('/api', require('./api'));

// Send index.html for any other requests that do not match our API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 505 ).send(err.message || 'Internal server error')
})

// exporting application
module.exports = app
