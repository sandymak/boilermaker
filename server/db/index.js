const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/5432/boilermaker', {
  logging: false
});
// other options to play with here...


module.exports = db
