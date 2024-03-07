import pool from "../configdb/database.js";

export const findUser = async (userName) => {
    /**
     * @type {[]}
     */
    const user = await pool.execute('SELECT * FROM users WHERE username = ?', [userName])

    if (user.length > 0) {
        return user
    }

    return false
}
