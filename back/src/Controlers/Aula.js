const Connection = require('../dao/connection.js');

//Cadastrar um responsavel
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


// //Cadastrar um aluno
// async function inserirAluno(aluno) {
//     const connection = new Connection();
    
//     try {
//       await connection.getConexao();
      
//        // Validate the input values
//        if (!aluno.nomeAluno||!aluno.telefoneAluno ||!aluno.idade ||!aluno.turmaAluno ||!aluno.idUsuario ||!aluno.idResponsavel) {
//         throw new Error('Nome, telefone, idade, turma, responsavel e usuario do aluno são obrigatórios');
//       }
  
//       // Query to insert a new Responsavel
//       const query = {
//         sql: 'INSERT INTO aluno SET idTurma = ?, idUsuario = ?, idResponsavel = ?, nomeAl = ?, idade = ?, telefone = ?, email = ?, cpf = ?, endereco = ?',
//         values: [aluno.turmaAluno, aluno.idUsuario, aluno.idResponsavel, aluno.nomeAluno, aluno.idade, aluno.telefoneAluno, aluno.emailAluno, aluno.cpfAluno, aluno.enderecoAluno]
//       };
//       const [result] = await connection.connection.execute(query.sql, query.values);

      
  
//       const queryBuscaRecemCadastrado = {
//           sql: 'SELECT * FROM aluno WHERE idUsuario = ?',
//           values: [aluno.idUsuario]
//         };
//       const [resultResponsavel] = await connection.connection.execute(queryBuscaRecemCadastrado.sql, queryBuscaRecemCadastrado.values);
        
//       let dataAtual = new Date();
//       const queryMatricula = {
//         sql: 'INSERT INTO matricula SET idTurma = ?, idAluno = ?, data = ?',
//         values: [aluno.turmaAluno, resultResponsavel[0].idAluno, dataAtual]
//       };
//       const [resultMatricula] = await connection.connection.execute(queryMatricula.sql, queryMatricula.values);
  
  
//       if (result.affectedRows > 0) {
//           return { isSave: resultResponsavel }; // Return a success response
//         } else {
//           return { isSave: false }; // Return a failure response
//         }
        
//       } catch (err) {
//         console.error(err);
//         return { isSave: false, error: err.message }; // Return an error response
//       } finally {
//         await connection.disconnect();
//       }
//   }

// //Busca todos os Alunos
// async function getAlunos() {
//   const connection = new Connection();
  
//   try {
//     await connection.getConexao();
    
     
//     //seleciona todos os cursos
//     const query = {
//       sql: 'SELECT * FROM aluno'
//     };
//     const [result] = await connection.connection.execute(query.sql);
//     if (result.length > 0) {
//       return { Alunos: result }; // Return the turma data
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

// //Busca 1 responsavel
// async function getResponsavel(idResponsavel) {
//     const connection = new Connection();
    
//     try {
//       await connection.getConexao();
      
       
//       //seleciona todos os usuarios
//       const query = {
//         sql: 'SELECT * FROM responsavel WHERE idResponsavel = ?',
//         values: [idResponsavel]
//       };
//       const [result] = await connection.connection.execute(query.sql, query.values);
  
//       if (result.length > 0) {
//         return { usuarioEncontrado: result }; // Return the responsavel data
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

// //Deleta um aluno
// async function excluirAluno(aluno) {
//     const connection = new Connection();
    
//     try {
//       await connection.getConexao();
      
//       // Validate the input value
//       if (!aluno) {
//         throw new Error('Um aluno é obrigatório');
//       }
    
//       // Query to delete the administrator
//       const queryAdm = {
//         sql: 'DELETE FROM aluno WHERE idAluno = ?',
//         values: [aluno.idAluno]
//       };
//       const [resultAluno] = await connection.connection.execute(queryAdm.sql, queryAdm.values);
    
//       // Query to delete the corresponding user records
//       const queryResponsavel = {
//         sql: 'DELETE FROM responsavel WHERE idResponsavel = ?',
//         values: [aluno.idResponsavel]
//       };
//       const [resultResp] = await connection.connection.execute(queryResponsavel.sql, queryResponsavel.values);

//       // Query to delete the corresponding user records
//       const queryUser = {
//         sql: 'DELETE FROM usuario WHERE idUsuario = ?',
//         values: [aluno.idUsuario]
//       };
//       const [resultUser] = await connection.connection.execute(queryUser.sql, queryUser.values);

//       const queryMatricula = {
//         sql: 'DELETE FROM matricula WHERE idAluno = ?',
//         values: [aluno.idAluno]
//       };
//       const [resultMatricula] = await connection.connection.execute(queryMatricula.sql, queryMatricula.values);
      
    
//       if (resultAluno.affectedRows > 0 && resultUser.affectedRows > 0 && resultResp.affectedRows > 0) {
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

// //Edita Responsavel
//   async function updateResponsavel(responsavel) {
//     if (!responsavel.idResponsavel) {
//       throw new Error('ID do responsavel is missing');
//     }
  
  
//     const connection = new Connection();
    
//     try {
//       await connection.getConexao();
  
//       // Update do responsavel
//       const query = {
//         sql: 'UPDATE responsavel SET nomeResponsavel = ?, telefone = ?, email = ?, endereco = ? WHERE idResponsavel = ?',
//         values: [responsavel.nomeResponsavel, responsavel.telefoneResponsavel, responsavel.emailResponsavel, responsavel.enderecoResponsavel, parseInt(responsavel.idResponsavel)] 
//       };
//       const [result] = await connection.connection.execute(query.sql, query.values);
      
  
//       if (result.affectedRows > 0) {
//         return { isUpdated: true }; // Return a success response
//       } else {
//         return { isUpdated: false }; // Return a failure response
//       }
      
//     } catch (err) {
//       console.error(err);
//       return { isUpdated: false, error: err.message }; // Return an error response
//     } finally {
//       await connection.disconnect();
//     }
//   }


//   //Edita aluno
//   async function editarAluno(aluno) {
//     if (!aluno.idAluno) {
//       throw new Error('ID do aluno is missing');
//     }
  
  
//     const connection = new Connection();
    
//     try {
//       await connection.getConexao();
  
//       // Update da turma
//       const query = {
//         sql: 'UPDATE aluno SET nomeAl = ?, idTurma = ?, idade = ?, telefone = ?, email = ?, cpf = ?, endereco = ? WHERE idAluno = ?',
//         values: [aluno.nomeAluno, aluno.turmaAluno, aluno.idade, aluno.telefoneAluno, aluno.emailAluno, aluno.cpfAluno, aluno.enderecoAluno, parseInt(aluno.idAluno)] 
//       };
//       const [result] = await connection.connection.execute(query.sql, query.values);

//       const queryMatricula = {
//         sql: 'UPDATE matricula SET idTurma = ? WHERE idAluno = ?',
//         values: [aluno.turmaAluno, parseInt(aluno.idAluno)]
//       };
//       const [resultMatricula] = await connection.connection.execute(queryMatricula.sql, queryMatricula.values);
  
//       if (result.affectedRows > 0) {
//         return { isUpdated: true }; // Return a success response
//       } else {
//         return { isUpdated: false }; // Return a failure response
//       }
      
//     } catch (err) {
//       console.error(err);
//       return { isUpdated: false, error: err.message }; // Return an error response
//     } finally {
//       await connection.disconnect();
//     }
//   }




  
module.exports = {
    inserirAula 
    // inserirAluno,
    // getAlunos, 
    // getResponsavel,
    // excluirAluno,
    // updateResponsavel, 
    // editarAluno
    
};