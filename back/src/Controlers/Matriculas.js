const Connection = require('../dao/connection.js');

//Busca todos as matriculas
async function getMatriculas() {
  const connection = new Connection();
  
  try {
    await connection.getConexao();
    
     
    //seleciona todos os cursos
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
  
module.exports = {
    getMatriculas
};