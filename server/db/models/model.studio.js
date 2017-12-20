'use strict';

const Sequelize = require('Sequelize');
const db = require('../index');

module.exports = db.define('studio', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Studio Ghibli'
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Tokyo'
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Studio_Ghibli_logo.svg/1200px-Studio_Ghibli_logo.svg.png',
    validate: {
      isUrl: true
    }
  },
  awards: {
    type: Sequelize.INTEGER
  },
})
