import mariadb from 'mariadb'
import { database } from './keys.js'

const pool = mariadb.createPool(database)

export default pool
