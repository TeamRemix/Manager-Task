import express from 'express'
import exphbs from 'express-handlebars'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import MySQLStore from 'express-mysql-session'
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport'
import cors from 'cors'
import bodyParser from 'body-parser'
import { PORT } from './config.js'
import { database } from './configdb/keys.js'
import './lib/passport.js'

// Routes imports
import indexRoute from './routes/index.routes.js'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
//initializacion
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

// setting mysql-sesion
const MySQLStoreSession = MySQLStore(session)
const sesionStore = new MySQLStoreSession(database)

// settings
app.set('port', PORT)
app.set('views', join(__dirname, 'views'))

//config views engine
const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: join(app.get('views'), 'layouts'),
  partialsDir: join(app.get('views'), 'partials'),
  extname: '.hbs',
})
app.engine('.hbs', hbs.engine)
app.set('view engine', 'hbs')

//middlewares
app.use(express.json())
app.use(express.text())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'Manage-Task',
  resave: false,
  saveUninitialized: false,
  store: sesionStore
}))

// setting passport 
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// settings globlas 
app.use((req , res , next) => {
  app.locals.success = req.flash('success')
  app.locals.message = req.flash('message')
  app.locals.user = req.user
  next()
})

//routes
app.use(indexRoute)
app.use(authRoutes)
app.use(taskRoutes)
//static files
app.use(express.static(join(__dirname, 'public')))

export default app
