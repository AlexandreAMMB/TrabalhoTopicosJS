const Connection = require('../dao/connection.js');

//Cadastrar uma Turma
async function putTurma(Turma) {
  const connection = new Connection();
  let dbCurse = null;
  
  try {
    await connection.getConexao();
    
     // Validate the input values
     if (!Turma.horarioDaTurma ||!Turma.diasDeAulaDaTurma ||!Turma.cursoDaTurma) {
      throw new Error('Horário da turma, Dias de aula da turma e o curso da turma são obrigatórios');
    }

    // Query to insert a new course
    const query = {
      sql: 'INSERT INTO turma SET HoraAulas = ?, diasAulas = ?, idCurso = ?',
      values: [Turma.horarioDaTurma, Turma.diasDeAulaDaTurma, Turma.cursoDaTurma]
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

//Busca todas as turmas
async function getTurmas() {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     
    //seleciona todos os cursos
    const query = {
      sql: 'SELECT * FROM turma'
    };
    const [result] = await connection.connection.execute(query.sql);
    if (result.length > 0) {
      return { Turmas: result }; // Return the turma data
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


//Deleta uma turma
async function deleteTurma(id) {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
    // Validate the input value
    if (!id) {
      throw new Error('ID da Turma é obrigatório');
    }

    // Query to delete a course
    const query = {
      sql: 'DELETE FROM turma WHERE idTurma = ?',
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


async function updateTurma(id, turma) {
  if (!id || !turma) {
    throw new Error('ID or Curso object is missing');
  }

  if (!turma.horarioDaTurma) {
    throw new Error('Turma Hora is missing required properties');
  }

  if (!turma.diasDeAulaDaTurma) {
    throw new Error('Turma dias de Aula is missing required properties');
  }

  if (!turma.cursoDaTurma) {
    throw new Error('Turma idCurso is missing required properties');
  }

  const connection = new Connection();
  
  try {
    await connection.getConexao();

    // Update da turma
    const query = {
      sql: 'UPDATE turma SET HoraAulas =?, diasAulas =?, idCurso =? WHERE idTurma =?',
      values: [turma.horarioDaTurma, turma.diasDeAulaDaTurma, turma.cursoDaTurma, parseInt(id)] // Convert id to integer
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
    putTurma,
    getTurmas,
    deleteTurma,
    updateTurma
};