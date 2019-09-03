const express = require('express');
const authMiddleware = require('../middlewares/auth');

const database = require('../../database/postgresql/connection')
const router = express.Router();
const Kind = require('../model/kind')

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const sql = 'SELECT id, name, email, status, kind, notes FROM users ORDER BY id ASC'
    await database.query(sql, (error, results) => {
      if (error)
        throw error

      return res.send({ data: results.rows })
    })

  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: 'Erro on loading database' })
  }
})

router.get('/kinds', (req, res) => {
  try {
    const kinds = Kind.
  } catch (err) {

  }
})

module.exports = app => app.use('/banco', router)