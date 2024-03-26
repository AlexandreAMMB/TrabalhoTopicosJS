const Connection = require('../dao/connection.js');


// Define your function to search for user

async function getUser(user) {
  const connection = new Connection();
  let dbUser = null;

  try {
    await connection.getConexao();

    // Query the user table
    const query = 'SELECT * FROM usuario WHERE login = ? AND senha = ?';
    const [rows] = await connection.connection.execute(query, [user.login, user.senha]);

    if (rows.length > 0) {
      dbUser = rows[0];
    }

    return dbUser;
  } catch (err) {
    console.error(err);
    return null;
  } finally {
    await connection.disconnect();
  }
}


module.exports = {
  getUser
};