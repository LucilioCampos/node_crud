const { Pool } = require('pg');
const pool = new Pool({
  user: 'mockup',
  host: 'localhost',
  database: 'cms_development',
  password: '123456',
  port: 5432,
})

module.exports = {
  query: async (query, params, callback) => {
    const start = Date.now()

    return await pool.query(query, params, (err, res) => {
      const duration = Date.now() - start
      if (res.rowCount)
        return { duration, rows: res.rowCount }

      return callback(err, res)
    })
  }
}