const Connection = require('../dao/connection.js');

//Cadastrar um responsavel
async function inserirResponsavel(responsavel) {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     // Validate the input values
     if (!responsavel.nomeResponsavel ||!responsavel.telefoneResponsavel ) {
      throw new Error('Nome e telefone do responsavel são obrigatórios');
    }

    // Query to insert a new Responsavel
    const query = {
      sql: 'INSERT INTO responsavel SET nomeResponsavel = ?, telefone = ?, email = ?, endereco = ?',
      values: [responsavel.nomeResponsavel, responsavel.telefoneResponsavel, responsavel.emailResponsavel, responsavel.enderecoResponsavel]
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

// //Busca todos os Adms
// async function getAdministrador() {
//   const connection = new Connection();
  
//   try {
//     await connection.getConexao();
    
     
//     //seleciona todos os cursos
//     const query = {
//       sql: 'SELECT * FROM administrador'
//     };
//     const [result] = await connection.connection.execute(query.sql);
//     if (result.length > 0) {
//       return { Adm: result }; // Return the turma data
//     } else {
//       return { buscaRealizada: false }; // Return a failure response
//     }
    
//   } catch (err) {
//     console.error(err);
//     return { buscaRealizada: false, error: err.message }; // Return an error response
//   } finally {
//     await connection.disconnect();
//   }
// }


// //Deleta um administrador
// async function excluirAdm_gerente(Adm) {
//     const connection = new Connection();
    
//     try {
//       await connection.getConexao();
      
//       // Validate the input value
//       if (!Adm) {
//         throw new Error('ID do administrador é obrigatório');
//       }
    
//       // Query to delete the administrator
//       const queryAdm = {
//         sql: 'DELETE FROM administrador WHERE idAdministrador = ?',
//         values: [Adm.idAdministrador]
//       };
//       const [resultAdm] = await connection.connection.execute(queryAdm.sql, queryAdm.values);
    
//       // Query to delete the corresponding user records
//       const queryUser = {
//         sql: 'DELETE FROM usuario WHERE idAdministrador = ?',
//         values: [Adm.idAdministrador]
//       };
//       const [resultUser] = await connection.connection.execute(queryUser.sql, queryUser.values);

//       // Query to delete the corresponding user records
//       if(Adm.idGestor != null){
//         const queryGestor = {
//             sql: 'DELETE FROM gestor WHERE idGestor = ?',
//             values: [Adm.idGestor]
//           };
//         const [resultGestor] = await connection.connection.execute(queryGestor.sql, queryGestor.values);

//       }
      
    
//       if (resultAdm.affectedRows > 0 && resultUser.affectedRows > 0) {
//         return { isDeleted: true }; // Return a success response
//       } else {
//         return { isDeleted: false }; // Return a failure response
//       }
      
//     } catch (err) {
//       console.error(err);
//       return { isDeleted: false, error: err.message }; // Return an error response
//     } finally {
//       await connection.disconnect();
//     }
//   }


// async function editarAdm_gerente(id, admin) {
//   if (!id ) {
//     throw new Error('ID is a object is missing');
//   }


//   const connection = new Connection();
  
//   try {
//     await connection.getConexao();

//     // Update da turma
//     const query = {
//       sql: 'UPDATE administrador SET nomeAD =?, email =?, telefone = ?, idGestor = ? WHERE idAdministrador = ?',
//       values: [admin.nomeAdm, admin.emailAdm, admin.telefone, admin.idGestor, parseInt(id)] // Convert id to integer
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


// async function getGestor(gestor) {
//     const connection = new Connection();
  
//     try {
//       await connection.getConexao();
      
       
//       //seleciona todos os usuarios
//       const query = {
//         sql: 'SELECT * FROM gestor WHERE idGestor = ?',
//         values: [gestor]
//       };
//       const [result] = await connection.connection.execute(query.sql, query.values);
  
//       if (result.length > 0) {
//         return { usuarioEncontrado: result }; // Return the courses data
//       } else {
//         return { buscaRealizada: false }; // Return a failure response
//       }
      
//     } catch (err) {
//       console.error(err);
//       return { buscaRealizada: false, error: err.message }; // Return an error response
//     } finally {
//       await connection.disconnect();
//     }
  
    
//   }


//   //Cadastra as informações de permissão do gestor
//   async function putGestor(gestor) {
//     const connection = new Connection();
    
    
//     try {
//       await connection.getConexao();
      
//        // Validate the input values
//        if (!gestor.idGestor ||!gestor.areaGestor) {
//         throw new Error('identificador do gestor e area de atuação são obrigatórios');
//       }
  
//       // Query to insert a new course
//       const query = {
//         sql: 'INSERT INTO gestor SET idGestor = ?, area = ?',
//         values: [gestor.idGestor, gestor.areaGestor]
//       };
//       const [result] = await connection.connection.execute(query.sql, query.values);
  
//       if (result.affectedRows > 0) {
//         return { isSave: true }; // Return a success response
//       } else {
//         return { isSave: false }; // Return a failure response
//       }
      
//     } catch (err) {
//       console.error(err);
//       return { isSave: false, error: err.message }; // Return an error response
//     } finally {
//       await connection.disconnect();
//     }
//   }











  
module.exports = {
    inserirResponsavel
    // getAdministrador,
    // inserirAdm_gerente,
    // excluirAdm_gerente,
    // getGestor,
    // putGestor,
    // editarAdm_gerente
    
};