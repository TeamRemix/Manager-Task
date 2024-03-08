import passport from 'passport'
import { Strategy } from 'passport-local'
import pool from '../configdb/database.js'
import bcrypt from './bcryptConfig.js'
import { findUser } from '../querys/usersquerys.js'

passport.use('local.signin', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const users = await pool.execute('SELECT * FROM users WHERE username = ?', [username])

    if (users.length > 0) {
        const user = users[0]
        const validPassword = await bcrypt.comparePasswords(password, user.password)
        if (validPassword)
            done(null, user)
        else
            done(null, false, req.flash('message', 'Incorrect Password'))
    } else {
        done(null, false, req.flash('message', 'Incorrect Username'))
    }
}))

passport.use('local.signup', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const userExit = await findUser(username)
    if (userExit) {
        done(null, false, req.flash('message', `That Username is alredy : ${username}`))
    } else {
    const user = { username, name: req.body.input_name, lastName : req.body.input_lastname, email: req.body.input_email }
    user.password = await bcrypt.encryptPassword(password)
    await pool.execute('INSERT INTO users (username, name, lastname, email, password) VALUES (?, ?, ?, ?, ?)', [user.username, user.name, user.lastName, user.email, user.password])
    done(null, user)
    }
}))

passport.serializeUser((user, done) => {
    console.log("Serialize: ");
    console.log(user);
    done(null, user.username);
})

passport.deserializeUser(async (id, done) => {
    const user = await pool.execute('SELECT * FROM users WHERE username = ?', [id])
    done(null, user[0])
})
