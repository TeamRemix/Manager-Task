import express from 'express'
import passport from 'passport'
import { functAuthMiddleware } from '../lib/middlewaresauth/authMiddleware.js'
import { getAllTask } from '../querys/taskquerys.js'

 
const router = express.Router()
const { isAuthenticated } = functAuthMiddleware

router.get('/singup', (req, res) => {
  res.render('auth/singup')
})


router.post('/singup', passport.authenticate('local.signup', {
    successRedirect: '/home',
    failureRedirect: '/singup',
    failureFlash: true
}))


router.get('/singin', (req, res) => {
    res.render('auth/login')
})

router.post('/singin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/home',
        failureRedirect: '/singin',
        failureFlash: true
    })(req, res, next)
})

router.get('/home', isAuthenticated, async (req, res) => {
    const userName = req.user.username

    const listTask = await  getAllTask(userName)

        
    res.render('home', {userName ,listTask})
})

router.get('/logout', isAuthenticated, async (req, res) => {
    await req.logout((err) => {
        if (err) return next(err);
        res.redirect('/singin')
      })
    
})

export default router
