const sequelize = require('../../database/postgresql')

const Kind = sequelize.define('kind', {
  // attributes
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
    // options
  });

module.exports = Kind;