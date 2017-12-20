'use strict';

const db = require('../index');
const Movie = require('./model.Movie');
const Studio = require('./model.studio');

// Require all the models
// Running each model (i.e. table) module (i.e. file) registers each model into our sequelize db
// This works if we all use the same Sequelize instance (instantiated in and exported from `/db/index.js`)

Movie.belongsTo(Studio);
Studio.hasMany(Movie);

// exporting the same db instance with these tabels and associations made
module.exports = db;

