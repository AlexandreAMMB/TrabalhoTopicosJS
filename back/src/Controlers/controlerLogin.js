const Connection = require('../dao/connection.js');


// Define your function to search for user

async function getUser(user) {
  console.log('User data:', user);
  const connection = new Connection();
  let dbUser = null;

  try {
    await connection.getConexao();

    // Query the user table
    const query = 'SELECT * FROM usuario WHERE login = ? AND senha = ?';
    const [rows] = await connection.connection.execute(query, [user.login, user.senha]);

    if (rows.length > 0) {
      return { isLoggedIn: true }; // Return a success response
    } else {
      return { isLoggedIn: false }; // Return a failure response
    }
    
  } catch (err) {
    console.error(err);
    return { isLoggedIn: false, error: err.message }; // Return an error response
  } finally {
    await connection.disconnect();
  }

  
}

async function novoUsuario(usuario) {
  const connection = new Connection();

 
  try {
    await connection.getConexao();
    
     // Validate the input values
     if (!usuario.login ||!usuario.senha) {
      throw new Error('Login e Senha são obrigatórios');
    }

    // Query to insert a new course
    const query = {
      sql: 'INSERT INTO usuario SET login = ?, senha = ?',
      values: [usuario.login, usuario.senha]
    };
    const [result] = await connection.connection.execute(query.sql, query.values);


    if (result.affectedRows > 0) {
      return { isSave: true }; // Return a success response
    } else {
      return { isSave: false }; // Return a failure response
    }
    
  } catch (err) {
    console.error(err);
    return { isSave: false, error: err.message }; // Return an error response
  } finally {
    await connection.disconnect();
  }

  
}

//Busca todos os usuarios
async function getUsuario(userLogin) {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     
    //seleciona todos os usuarios
    const query = {
      sql: 'SELECT * FROM usuario WHERE login = ?',
      values: [userLogin]
    };
    const [result] = await connection.connection.execute(query.sql, query.values);

    if (result.length > 0) {
      return { usuarioEncontrado: result }; // Return the courses data
    } else {
      return { buscaRealizada: false }; // Return a failure response
    }
    
  } catch (err) {
    console.error(err);
    return { buscaRealizada: false, error: err.message }; // Return an error response
  } finally {
    await connection.disconnect();
  }
}


async function updateUsuario(usuario) {
  if (!usuario.idAdministrador) {
    throw new Error('ID do administrador is missing');
  }


  const connection = new Connection();
  
  try {
    await connection.getConexao();

    // Update da turma
    const query = {
      sql: 'UPDATE usuario SET idAdministrador = ? WHERE idUsuario = ?',
      values: [usuario.idAdministrador, usuario.idUsuario] 
    };
    const [result] = await connection.connection.execute(query.sql, query.values);

    if (result.affectedRows > 0) {
      return { isUpdated: true }; // Return a success response
    } else {
      return { isUpdated: false }; // Return a failure response
    }
    
  } catch (err) {
    console.error(err);
    return { isUpdated: false, error: err.message }; // Return an error response
  } finally {
    await connection.disconnect();
  }
}






module.exports = {
  getUser,
  novoUsuario,
  getUsuario,
  updateUsuario
};