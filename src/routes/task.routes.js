import { Router } from 'express'
import { createTask, updateTask, findTask, deleteTask } from '../querys/taskquerys.js'
import { checkEmptyFields } from '../validator/taskvalidator.js'

const router = Router()

router.post('/task/create', checkEmptyFields, async (req, res) => {
  const titulo = req.body.taskTitle
  const descripcion = req.body.taskDes
  const completada = false
  const username = req.user.username

  console.log('Datos recibidos del formulario:')
  console.log('Título:', titulo)
  console.log('Descripción:', descripcion)
  console.log('Nombre de usuario:', username)

  try {
    if (await findTask(titulo, username)) {
      console.log('titulo en uso escoja otro')
    } else {
      createTask(titulo, descripcion, completada, username)
      console.log('Tarea creada con éxito')
      res.redirect('/home')
    }
  } catch (error) {
    console.error('Error al crear la tarea:', error)
    res.status(500).send('Error interno del servidor al crear la tarea')
  }
})

router.post('/task/update', (req, res) => {
  const descripcion = req.body.editionDes
  const completada = req.body.checkComplete === 'true'
  const username = req.user.username
  const titulo = req.body.titleEdit
  try {
    updateTask(descripcion, completada, username, titulo)
    res.redirect('/home')
  } catch (error) {
    console.error('Error al actualizar la tarea:', error)
    res.status(500).send('Error interno del servidor al actualizar la tarea')
  }
})

router.post('/delete/:title', async (req, res) => {
  await deleteTask(req.params.title, req.user.username)
  req.flash('success', 'tarea eliminada!')
  res.redirect('/home')
})

export default router
