import pool from '../configdb/database'

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
