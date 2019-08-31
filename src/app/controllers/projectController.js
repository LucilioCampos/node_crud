const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../model/project');
const Task = require('../model/task')

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate(['user', 'tasks'])

    return res.send({ projects })
  } catch (err) {
    return res.status(400).send({ error: 'Erro on loading projects' })
  }
})

router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate('user')

    if (!project)
      return res.send({ message: 'Project id not found' })

    return res.send({ project })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ error: 'Erro on loading projects' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, description, tasks } = req.body

    const project = await Project.create({ title, description, user: req.userId })

    await Promise.all(tasks.map(async task => {
      const projectTask = new Task({ ...task, project: project._id })

      await projectTask.save()
      project.tasks.push(projectTask)
    }))

    await project.save();

    return res.send({ project })
  } catch (err) {
    return res.status(400).send({ message: "Error creating new project" })
  }
})

router.put('/:projectId', async (req, res) => {
  try {
    id = req.params.projectId
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true }).populate('user')

    if (!project)
      return res.send({ message: 'Project id not found' })

    return res.send({ project })
  } catch (err) {
    return res.status(400).send({ message: 'Error on updating Project' })
  }
})

router.delete('/:projectId', async (req, res) => {
  try {
    const project = await Project.findByIdAndRemove(req.params.projectId)

    if (!project)
      return res.send({ message: 'Project id not found' })

    return res.status(204).send({ project })
  } catch (err) {
    res.status(400).send({ message: 'Error on removing Project' })
  }
})



module.exports = app => app.use('/projects', router);