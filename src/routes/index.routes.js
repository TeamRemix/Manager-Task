import { Router } from 'express'
import { findTask } from '../querys/taskquerys.js'

const router = Router()

router.get('/main', (req, res) => {
  res.render('index')
})

router.get('/test', async (req, res) => {
  

   if (await findTask('play', req.user.username)) {
    // aqui deberia ir una logica si la tarea exite
    console.log(`la tarea existe :`);
   } else {
    // aqui debe ir una logica si la tarea no exite
    console.log(`la tarea no existe:`);
   }
    
  res.render('vistatest')
})
//router.get('/home', (req, res) => {
//  res.render('home')
//})

export default router
