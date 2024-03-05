import { Router } from 'express'

const router = Router()

router.get('/main', (req, res) => {
  res.render('index')
})

export default router
