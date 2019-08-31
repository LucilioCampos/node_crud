const express = require('express');
const authMiddleware = require('../middlewares/auth');

const database = require('../../database/postgresql/connection')
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const query = await database.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error)
        throw error

      return res.send(results.rows)
    })

  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Erro on loading database' })
  }
})

module.exports = app => app.use('/banco', router)