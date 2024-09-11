const Connection = require('../dao/connection.js');

//Cadastrar uma aula
async function inserirAula(aula) {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     // Validate the input values
     if (!aula.dataAula ||!aula.frequencia ) {
      throw new Error('Data da aula e frequencia são obrigatórios');
    }

    // Query to insert a new Responsavel
    const query = {
      sql: 'INSERT INTO aula SET dataAula = ?, descricaoAula = ?, idTurma = ?',
      values: [aula.dataAula, aula.descricaoAula, aula.idTurma]
    };
    const [result] = await connection.connection.execute(query.sql, query.values);
    
    // Obtem o último ID inserido
    const idAula = result.insertId;
    
    const freqArray = Object.values(aula.frequencia); //converto o objeto das frequencias selecionadas para um array 


    async function inserirFrequencias() {
      for (const item of freqArray) {
        if(item != null){
          const queryfrequencia = {
            sql: 'INSERT INTO frequencia SET idAula = ?, idAluno = ?, presenca = ?',
            values: [idAula, item, 1]
          };
          const [resultfreq] = await connection.connection.execute(queryfrequencia.sql, queryfrequencia.values);

        }
        
      }
    }
    
    await inserirFrequencias(); // Aguardar até que a função termine de executar para que a conexão com o banco não feche

  
    if (result.affectedRows > 0) {
        return { isSave: result }; // Return a success response
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

//Busca todas as aulas
async function getAulas() {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     
    //seleciona todos as matriculas
    const query = {
      sql: 'SELECT * FROM aula'
    };
    const [result] = await connection.connection.execute(query.sql);
    if (result.length > 0) {
      return { Aulas: result }; // Return the turma data
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


//Deleta uma Aula
async function excluirAula(aula) {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
    // Validate the input value
    if (!aula) {
      throw new Error('Dados da aula são obrigatórios para o delete');
    }
  
    // Query to delete a aula
    const queryAula = {
      sql: 'DELETE FROM aula WHERE idAula = ?',
      values: [aula]
    };
    const [resultAula] = await connection.connection.execute(queryAula.sql, queryAula.values);

    // Query to delete a frequencia da aula
    const queryCheck = {
      sql: 'SELECT COUNT(*) FROM frequencia WHERE idAula = ?',
      values: [aula]
    };
    const [count] = await connection.connection.execute(queryCheck.sql, queryCheck.values);
    
    if (count > 0) {
      const queryfrequencia = {
        sql: 'DELETE FROM frequencia WHERE idAula = ?',
        values: [aula.idAula]
      };
      const [resultfreq] = await connection.connection.execute(queryfrequencia.sql, queryfrequencia.values);
    }
    
  
    if (resultAula.affectedRows > 0) {
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


//editar uma aula
async function editarAula(idAula, aula) {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     // Validate the input values
     if (!aula.dataAula ) {
      throw new Error('Data da aula e frequencia são obrigatórios');
    }

    // Query to insert a new Responsavel
    const query = {
      sql: 'UPDATE aula SET dataAula = ?, descricaoAula = ?, idTurma = ? WHERE idAula = ?',
      values: [aula.dataAula, aula.descricaoAula, aula.idTurma, parseInt(idAula)]
    };
    const [result] = await connection.connection.execute(query.sql, query.values);
    
    
    const freqArray = Object.values(aula.frequencia); //converto o objeto das frequencias selecionadas para um array 
   
    // Query to delete a frequencia atual existente
    const queryCheck = {
      sql: 'SELECT COUNT(*) FROM frequencia WHERE idAula = ?',
      values: [idAula]
    };
    const [count] = await connection.connection.execute(queryCheck.sql, queryCheck.values);
    
    if (count > 0) {
      const queryfrequencia = {
        sql: 'DELETE FROM frequencia WHERE idAula = ?',
        values: [idAula]
      };
      const [resultfreq] = await connection.connection.execute(queryfrequencia.sql, queryfrequencia.values);
    }


    async function inserirFrequencias() {
      for (const item of freqArray) {
        if(item != null){
          const queryfrequenciA = {
            sql: 'INSERT INTO frequencia SET idAula = ?, idAluno = ?, presenca = ?',
            values: [idAula, item, 1]
          };
          const [resultfrequecia] = await connection.connection.execute(queryfrequenciA.sql, queryfrequenciA.values);

        }
        
      }
    }
    
    await inserirFrequencias(); // Aguardar até que a função termine de executar para que a conexão com o banco não feche

  
    if (result.affectedRows > 0) {
        return { isUpdated: result }; // Return a success response
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

//Busca todas as frequencias da aula
async function getFrequencias() {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     
    //seleciona todos as frequencias
    const query = {
      sql: 'SELECT * FROM frequencia'
    };
    const [result] = await connection.connection.execute(query.sql);
    if (result.length > 0) {
      return { frequencia: result }; // Return the turma data
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








  
module.exports = {
    inserirAula,
    getAulas,
    excluirAula,
    editarAula,
    getFrequencias
    
    
};