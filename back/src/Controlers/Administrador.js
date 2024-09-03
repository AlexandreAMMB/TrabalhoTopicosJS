const Connection = require('../dao/connection.js');

//Cadastrar um administrador
async function inserirAdm_gerente(Admin) {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     // Validate the input values
     if (!Admin.nomeAdm ||!Admin.emailAdm||!Admin.telefone ||!Admin.idUsuario) {
      throw new Error('Nome, email, telefone e usuario do administrador são obrigatórios');
    }

    // Query to insert a new Adm
    const query = {
      sql: 'INSERT INTO administrador SET nomeAD = ?, email = ?, telefone = ?, idUsuario = ?',
      values: [Admin.nomeAdm, Admin.emailAdm, Admin.telefone, Admin.idUsuario]
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

//Busca todas os Adms
async function getAdministrador() {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     
    //seleciona todos os cursos
    const query = {
      sql: 'SELECT * FROM administrador'
    };
    const [result] = await connection.connection.execute(query.sql);
    if (result.length > 0) {
      return { Adm: result }; // Return the turma data
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


//Deleta um administrador
async function excluirAdm_gerente(id) {
    const connection = new Connection();
    
    try {
      await connection.getConexao();
      
      // Validate the input value
      if (!id) {
        throw new Error('ID do administrador é obrigatório');
      }
    
      // Query to delete the administrator
      const queryAdm = {
        sql: 'DELETE FROM administrador WHERE idAdministrador = ?',
        values: [id]
      };
      const [resultAdm] = await connection.connection.execute(queryAdm.sql, queryAdm.values);
    
      // Query to delete the corresponding user records
      const queryUser = {
        sql: 'DELETE FROM usuario WHERE idAdministrador = ?',
        values: [id]
      };
      const [resultUser] = await connection.connection.execute(queryUser.sql, queryUser.values);
    
      if (resultAdm.affectedRows > 0 && resultUser.affectedRows > 0) {
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


// async function updateTurma(id, turma) {
//   if (!id || !turma) {
//     throw new Error('ID or Curso object is missing');
//   }

//   if (!turma.horarioDaTurma) {
//     throw new Error('Turma Hora is missing required properties');
//   }

//   if (!turma.diasDeAulaDaTurma) {
//     throw new Error('Turma dias de Aula is missing required properties');
//   }

//   if (!turma.cursoDaTurma) {
//     throw new Error('Turma idCurso is missing required properties');
//   }

//   const connection = new Connection();
  
//   try {
//     await connection.getConexao();

//     // Update da turma
//     const query = {
//       sql: 'UPDATE turma SET HoraAulas =?, diasAulas =?, idCurso =? WHERE idTurma =?',
//       values: [turma.horarioDaTurma, turma.diasDeAulaDaTurma, turma.cursoDaTurma, parseInt(id)] // Convert id to integer
//     };
//     const [result] = await connection.connection.execute(query.sql, query.values);

//     if (result.affectedRows > 0) {
//       return { isUpdated: true }; // Return a success response
//     } else {
//       return { isUpdated: false }; // Return a failure response
//     }
    
//   } catch (err) {
//     console.error(err);
//     return { isUpdated: false, error: err.message }; // Return an error response
//   } finally {
//     await connection.disconnect();
//   }
// }
  
module.exports = {
    // putTurma,
    getAdministrador,
    inserirAdm_gerente,
    excluirAdm_gerente
    // updateTurma
};