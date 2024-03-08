import { Router } from 'express'
import { deleteTask } from '../querys/taskquerys.js'

const router = Router()

router.post('/delete/:title', async (req, res) => {
  await deleteTask(req.params.title, req.user.username)
  req.flash('success', 'tarea eliminada!')
  res.redirect('/home')
})


export default router