import pool from '../configdb/database.js'

export async function createTask(titulo, descripcion, username) {
  const queryCreate =
    'INSERT INTO task (titulo, descripcion, username) VALUES (?, ?, ?)'
  try {
    await pool.query(queryCreate, [titulo, descripcion, username])
  } catch (err) {
    console.log('error en la consulta', err)
  }
}

export async function updateTask(descripcion, username, id) {
  const queryUpdate =
    'UPDATE task SET descripcion = ? WHERE username = ? AND id= ?;'
  try {
    await pool.query(queryUpdate, [descripcion, username, id])
  } catch (err) {
    console.log('error la consulta')
  }
}
