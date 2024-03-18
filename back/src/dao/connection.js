const mysql = require('mysql2/promise');

class Connection{
    constructor() {
        this.connection = null;
    }
  
    async getConexao() {
      try {
        this.connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'P@mell@1999',
          database: 'panc'
        });
          console.log('Connected to MySQL!');
      } catch (error) {
          console.error('Error connecting to MySQL:', error);
        }
    }
  
    async disconnect() {
      if (this.connection) {
        await this.connection.end();
          console.log('Disconnected from MySQL!');
      }
    }
}
module.exports = Connection;