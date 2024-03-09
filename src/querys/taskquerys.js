import pool from '../configdb/database.js'

export async function createTask(titulo, descripcion, completada, username) {
  const queryCreate = 'INSERT INTO task (titulo, descripcion, completada,username) VALUES (?, ?, ?,?)'
  try {
    await pool.query(queryCreate, [titulo, descripcion, completada, username])
  } catch (err) {
    console.log('error en la consulta', err)
  }
}

export async function updateTask(descripcion, completada, username, titulo) {
  const queryUpdate = 'UPDATE task SET descripcion = ?, completada= ? WHERE username = ? AND titulo= ?;'
  try {
    await pool.query(queryUpdate, [descripcion, completada, username, titulo])
  } catch (err) {
    console.log('error la consulta')
  }
}
export const getAllTask = async (userName) => {
  /**
   * @type {[]}
   */
  const task = await pool.execute(' SELECT titulo, completada, descripcion from task WHERE username = ? ', [userName])
  //console.log(`las task ${JSON.stringify(task)}`);
  if (task) {
    const listTask = task.map((item) => {
      return {
        title: item.titulo,
        completada: item.completada === 1 ? true : false,
        descripcion: item.descripcion
      }
    })
    console.log(`las task ${JSON.stringify(listTask)}`)
    return listTask
  }

  return false
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

export const deleteTask = async (title, userName) => {
  await pool.execute('DELETE FROM task WHERE titulo = ? AND username = ?', [title, userName])
}
