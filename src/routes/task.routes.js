import { Router } from 'express'
import { createTask, updateTask } from '../querys/taskquerys.js'

const router = Router()

router.post('/task/create', (req, res) => {
  const { titulo, descripcion, username } = req.body
  try {
    if (JSON.stringify(titulo).length > 2 && JSON.stringify(descripcion).length > 2 && JSON.stringify(username.length > 2)) {
      createTask(titulo, descripcion, username)
      res.send('Task created successfully')
    } else {
      console.error('Error al crear la tarea:')
      res.redirect('/home')
    }
  } catch (error) {
    console.error('Error al crear la tarea:', error)
    res.status(500).send('Error interno del servidor al crear la tarea')
  }
})
router.put('/task/update', (req, res) => {
  const { descripcion, username, id } = req.body
  try {
    updateTask(descripcion, username, id)
    res.send('Task updated successfully')
  } catch (error) {
    console.error('Error al actualizar la tarea:', error)
    res.status(500).send('Error interno del servidor al actualizar la tarea')
  }
})

export default router
