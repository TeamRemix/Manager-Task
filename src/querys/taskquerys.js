import pool from '../configdb/database.js'

export const createTask = async (title, userName) => {
  try {
    await pool.execute('INSERT INTO task (word_english, meaning, user_name, number_frecuency) VALUES (?, ?, ?, ?)', [
      wordEnglish.toUpperCase(),
      meaning.toUpperCase(),
      user_name,
      1,
    ])
  } catch (error) {
    console.log(`Error while quering the database -->> CREATE`)
  }
}

export const getAllTask = async (userName) => {
  /**
   * @type {[]}
   */
  const task =  await pool.execute(' SELECT titulo, completada from task WHERE username = ? ', [userName])
  //console.log(`las task ${JSON.stringify(task)}`);
  if (task) {
     const listTask = task.map(item => {
      return {
        title: item.titulo,
        completada: item === 1 ? true : false
      }
    })
    console.log(`las task ${JSON.stringify(listTask)}`);
    return listTask
  }

  return false
  
}
