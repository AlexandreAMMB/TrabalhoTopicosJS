const Connection = require('../dao/connection.js');

//Cadastrar um curso
async function putCurse(curse) {
  const connection = new Connection();
  let dbCurse = null;
  
  try {
    await connection.getConexao();
    
     // Validate the input values
     if (!curse.nomeDoCurso ||!curse.statusDoCurso) {
      throw new Error('Nome do curso e status do curso são obrigatórios');
    }

    // Query to insert a new course
    const query = {
      sql: 'INSERT INTO curso SET nome = ?, status = ?',
      values: [curse.nomeDoCurso, curse.statusDoCurso]
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

//Busca todos os cursos
async function getCourses() {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     
    //seleciona todos os cursos
    const query = {
      sql: 'SELECT * FROM curso'
    };
    const [result] = await connection.connection.execute(query.sql);
    if (result.length > 0) {
      return { cursos: result }; // Return the courses data
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


//Deleta um curso
async function deleteCourse(id) {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
    // Validate the input value
    if (!id) {
      throw new Error('ID do curso é obrigatório');
    }

    // Query to delete a course
    const query = {
      sql: 'DELETE FROM curso WHERE idCurso = ?',
      values: [id]
    };
    const [result] = await connection.connection.execute(query.sql, query.values);

    if (result.affectedRows > 0) {
      return { isDeleted: true }; // Return a success response
    } else {
      return { isDeleted: false }; // Return a failure response
    }
    
  } catch (err) {
    console.error(err);
    return { isDeleted: false, error: err.message }; // Return an error response
  } finally {
    await connection.disconnect();
  }
}


async function updateCourse(id, curso) {
  if (!id || !curso) {
    throw new Error('ID or Curso object is missing');
  }

  if (!curso.nome || !curso.status) {
    throw new Error('Curso object is invalid');
  }
  const connection = new Connection();
  
  try {
    await connection.getConexao();

    // Update the course
    const query = {
      sql: 'UPDATE curso SET nome =?, status =? WHERE idCurso =?',
      values: [curso.nome, curso.status, parseInt(id)] // Convert id to integer
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
    putCurse,
    getCourses,
    deleteCourse,
    updateCourse
};