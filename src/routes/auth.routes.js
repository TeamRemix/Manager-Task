import express from 'express'
import passport from 'passport'
import { functAuthMiddleware } from '../lib/middlewaresauth/authMiddleware.js'

 
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

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})

router.get('/home', isAuthenticated, async (req, res) => {
    const userName = req.user.username

    const listTask = [
        {
            title: 'correr',
            completada: true
        },
        {
            title: 'saltar',
            completada: true
        },
        {
            title: 'reir',
            completada: true
        },
        {
            title: 'mirar',
            completada: false
        },
        {
            title: 'mirar',
            completada: false
        },
        {
            title: 'mirar',
            completada: true
        }
    ]
    res.render('home', {userName ,listTask})
})

router.get('/logout', isAuthenticated, async (req, res) => {
    await req.logout((err) => {
        if (err) return next(err);
        res.redirect('signin')
      })
    
})

export default router
