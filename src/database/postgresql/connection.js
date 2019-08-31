const postgress = require('pg');
const pool = new postgress.Pool({
  user: 'mockup',
  host: 'localhost',
  database: 'cms_development',
  password: '123456',
  port: 5432,
})

module.exports = pool