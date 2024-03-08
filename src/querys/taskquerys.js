import pool from '../configdb/database.js'

export async function createTask(titulo, descripcion, completada, username) {
  const queryCreate = 'INSERT INTO task (titulo, descripcion, completada,username) VALUES (?, ?, ?,?)'
  try {
    await pool.query(queryCreate, [titulo, descripcion, completada, username])
  } catch (err) {
    console.log('error en la consulta', err)
  }
}

export async function updateTask(descripcion, username, titulo) {
  const queryUpdate = 'UPDATE task SET descripcion = ? WHERE username = ? AND titulo= ?;'
  try {
    await pool.query(queryUpdate, [descripcion, username, titulo])
  } catch (err) {
    console.log('error la consulta')
  }
}
export const findTask = async (title, userName) => {
  /**
   * @type {[]}
   */
  const task = await pool.execute('SELECT titulo, descripcion from task WHERE titulo = ? AND username = ?', [title, userName])

  if (task.length > 0) {
    return true
  }

  return false
}
