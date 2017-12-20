'use strict';

const Sequelize = require('sequelize');
const db = require('../index');

module.exports = db.define('movies', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Totoro',
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/en/0/02/My_Neighbor_Totoro_-_Tonari_no_Totoro_%28Movie_Poster%29.jpg',
    validate: {
      isUrl: true
    }
  },
  rating: {
    type: Sequelize.FLOAT,
    defaultValue: 10.0,
    validate: {
      min: 0.0,
      max: 10.0
    }
  }
})
