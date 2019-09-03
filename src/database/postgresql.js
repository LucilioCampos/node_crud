const Sequelize = require('sequelize')

const sequelize = new Sequelize('cms_development', 'mockup', '123456', {
  host: 'localhost',
  dialect: 'postgres'
})

module.exports = sequelize