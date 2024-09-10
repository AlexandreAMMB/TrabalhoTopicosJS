const Connection = require('../dao/connection.js');

//Busca todos as matriculas
async function getMatriculas() {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     
    //seleciona todos as matriculas
    const query = {
      sql: 'SELECT * FROM matricula'
    };
    const [result] = await connection.connection.execute(query.sql);
    if (result.length > 0) {
      return { Matriculas: result }; // Return the turma data
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



//Salva 1 matricula
async function inserirMatricula(matricula) {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     // Validate the input values
     if (!matricula.idAluno ||!matricula.idTurma ) {
      throw new Error('Aluno e Turma são obrigatórios');
    }

    let dataAtual = new Date();
      const queryMatricula = {
        sql: 'INSERT INTO matricula SET idTurma = ?, idAluno = ?, data = ?',
        values: [matricula.idTurma, matricula.idAluno, dataAtual]
      };
      const [resultMatricula] = await connection.connection.execute(queryMatricula.sql, queryMatricula.values);

  
    if (resultMatricula.affectedRows > 0) {
        return { isSave: resultMatricula }; // Return a success response
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

//Deleta uma matricula
async function excluirMatricula(matricula) {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
    // Validate the input value
    if (!matricula) {
      throw new Error('Dados da Matricula são obrigatórios para o delete');
    }
  
    // Query to delete the administrator
    const queryAdm = {
      sql: 'DELETE FROM matricula WHERE idAluno = ? AND idTurma = ?',
      values: [matricula.idAluno, matricula.idTurma]
    };
    const [resultMatricula] = await connection.connection.execute(queryAdm.sql, queryAdm.values);
  
  
    if (resultMatricula.affectedRows > 0 ) {
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






  
module.exports = {
    getMatriculas,
    inserirMatricula,
    excluirMatricula
};