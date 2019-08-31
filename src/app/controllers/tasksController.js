const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../model/project');
const Task = require('../model/task')

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()

    if (tasks.length === 0)
      return res.send({ message: 'No tasks found' })

    return res.send({ tasks })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ message: 'Erro on list tasks' })
  }
})

router.get('/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)

    if (!task)
      return res.send({ message: `No task found with id ${taskId} ` })

    return res.send({ task })
  } catch (err) {
    return res.status(400).send({ message: 'Error on get task' })
  }
})

router.post('/', async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, assignedTo: req.userId })

    return res.send({ task })
  } catch (err) {
    return res.status(400).send({ message: 'Error on create a task ' })
  }
})

router.put('/:taskId', async (req, res) => {
  try {
    const id = req.params.taskId

    const update = await Task.findByIdAndUpdate(id, req.body, { new: true })

    if (!update)
      return res.send({ message: 'Task not found' })

    return res.send({ update })
  } catch (err) {
    return res.status(400).send({ message: 'Erro on updating task!' })
  }
})

router.delete('/:taskId', async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.taskId)

    if (!task)
      return res.send({ message: 'Task not found' })

    return res.status(204).send({ message: 'Task successfully removed' })
  } catch (err) {
    return res.status(400).send({ message: `Error ${err} on updating Task` })
  }

})

module.exports = app => app.use('/tasks', router);