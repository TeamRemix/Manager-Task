import { Router } from 'express'
import { createTask, updateTask, findTask } from '../querys/taskquerys.js'
import { checkEmptyFields } from '../validator/taskvalidator.js'

const router = Router()

router.post('/task/create', checkEmptyFields, async (req, res) => {
  const titulo = req.body.taskTitle
  const descripcion = req.body.taskDes
  const username = req.body.taskNUser
  const completada = false
  try {
    if (await findTask(titulo, username)) {
      console.log('la tarea existe')
      res.redirect('/home')
    } else {
      createTask(titulo, descripcion, completada, username)
      res.redirect('/home')
    }
  } catch (error) {
    res.status(500).send('Error interno del servidor al crear la tarea')
    console.error('Error al crear la tarea:')
    res.redirect('/home')
  }
})
router.post('/task/update', (req, res) => {
  const descripcion = req.body.taskDes
  const username = req.body.userN
  const titulo = req.body.taskTitle
  try {
    updateTask(descripcion, username, titulo)
    res.redirect('/home')
  } catch (error) {
    console.error('Error al actualizar la tarea:', error)
    res.status(500).send('Error interno del servidor al actualizar la tarea')
  }
})

export default router
