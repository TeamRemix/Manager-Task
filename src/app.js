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

/**
 * Crea una instancia de la aplicación Express para manejar las solicitudes HTTP.
 */
const app = express()

/**
 * Obtiene el directorio actual del archivo en el que se encuentra este código.
 *
 * @constant {string} __dirname - Directorio actual del archivo.
 * @param {string} import.meta.url - URL del módulo actual.
 * @function fileURLToPath - Convierte una URL en una ruta de archivo.
 * @function dirname - Obtiene el directorio de la ruta de archivo especificada.
 */
const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Crea una instancia de MySQLStore para almacenar sesiones de usuario en la base de datos MySQL.
 *
 * @param {object} session - Objeto de sesión utilizado para la gestión de sesiones en la aplicación.
 */
const MySQLStoreSession = MySQLStore(session)

/**
 * Crea una instancia de MySQLStore para almacenar sesiones de usuario en la base de datos MySQL, utilizando la base de datos especificada.
 *
 * @param {object} database - Objeto de conexión a la base de datos MySQL.
 */
const sesionStore = new MySQLStoreSession(database)

/**
 * Establece el puerto en el que la aplicación escuchará las solicitudes entrantes.
 *
 * @param {number} PORT - El número de puerto en el que la aplicación escuchará.
 */
app.set('port', PORT)

/**
 * Establece el directorio base para las vistas de la aplicación.
 * Las vistas son plantillas que se renderizan para mostrar contenido dinámico al usuario.
 *
 * @param {string} __dirname - Directorio actual del archivo en el que se encuentra este código.
 * @param {string} 'views' - Nombre del directorio donde se encuentran las vistas.
 */
app.set('views', join(__dirname, 'views'))

/**
 * Configura el motor de vistas para la aplicación.
 * Utiliza Handlebars como motor de plantillas.
 *
 * @const hbs - Motor de plantillas Handlebars configurado.
 * @type {Object}
 */
const hbs = exphbs.create({
  defaultLayout: 'main', // Diseño predeterminado de las vistas
  layoutsDir: join(app.get('views'), 'layouts'), // Directorio de diseños de vistas
  partialsDir: join(app.get('views'), 'partials'), // Directorio de parciales de vistas
  extname: '.hbs', // Extensión de los archivos de plantillas
})

/**
 * Configura el motor de vistas para usar Handlebars como motor de plantillas.
 */
app.engine('.hbs', hbs.engine)

/**
 * Establece Handlebars como el motor de plantillas de vistas predeterminado para la aplicación.
 */
app.set('view engine', 'hbs')

/**
 * Middleware para analizar el cuerpo de las solicitudes entrantes en formato JSON.
 */
app.use(express.json())

/**
 * Middleware para permitir solicitudes CORS (Cross-Origin Resource Sharing).
 */
app.use(cors())

/**
 * Middleware para analizar el cuerpo de las solicitudes entrantes codificadas en urlencoded.
 *
 * @param {boolean} extended - Indica si se analizan objetos complejos (false para no permitir).
 */
app.use(bodyParser.urlencoded({ extended: false }))

/**
 * Middleware para analizar el cuerpo de las solicitudes entrantes codificadas en urlencoded.
 *
 * @param {boolean} extended - Indica si se analizan objetos complejos (false para no permitir).
 */
app.use(express.urlencoded({ extended: false }))

/**
 * Middleware para gestionar las sesiones de usuario.
 *
 * @param {string} secret - Clave secreta utilizada para firmar la sesión.
 * @param {boolean} resave - Indica si se vuelve a guardar la sesión en el almacén aunque no haya cambios.
 * @param {boolean} saveUninitialized - Indica si se guarda la sesión aunque no esté inicializada.
 * @param {object} store - Almacén de sesiones utilizado para almacenar y recuperar sesiones de usuario.
 */
app.use(
  session({
    secret: 'Manage-Task', // Clave secreta utilizada para firmar la sesión
    resave: false, // No se vuelve a guardar la sesión en el almacén aunque no haya cambios
    saveUninitialized: false, // No se guarda la sesión aunque no esté inicializada
    store: sesionStore, // Almacén de sesiones utilizado para almacenar y recuperar sesiones de usuario
  })
)

/**
 * Middleware para inicializar Passport en la aplicación.
 */
app.use(passport.initialize())

/**
 * Middleware para manejar sesiones de Passport en la aplicación.
 */
app.use(passport.session())

/**
 * Middleware para manejar mensajes flash en la aplicación.
 */
app.use(flash())


/**
 * Middleware para configurar variables locales en la aplicación.
 * Estas variables están disponibles en todas las vistas.
 * 
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para llamar al siguiente middleware en la cadena.
 */
app.use((req, res, next) => {
  app.locals.success = req.flash('success') // Mensajes de éxito para mostrar al usuario
  app.locals.message = req.flash('message') // Mensajes informativos para mostrar al usuario
  app.locals.user = req.user // Usuario actualmente autenticado
  next() // Llama al siguiente middleware en la cadena
})



/**
 * Configuración de las rutas de la aplicación.
 *  Se Utiliza diferentes archivos para organizar las rutas.
 */

// Ruta principal
app.use(indexRoute);

// Rutas de autenticación
app.use(authRoutes);

// Rutas de tareas
app.use(taskRoutes);


/**
 * Configuración de archivos estáticos para la aplicación.
 * Archivos estáticos son servidos directamente sin procesamiento por Express.
 * 
 * @param {string} __dirname - Directorio actual del archivo en el que se encuentra este código.
 * @param {string} 'public' - Directorio donde se encuentran los archivos estáticos públicos.
 */
app.use(express.static(join(__dirname, 'public')))


export default app
