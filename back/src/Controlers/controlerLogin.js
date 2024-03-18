const Connection = require('../dao/connection.js');

exports.login = async (req, res) => {
  
  // const login = req.body.login;
  // const senha = req.body.senha;


  const connect = new Connection();
  const conn = await connect.getConexao();

  const sql = 'SELECT * FROM usuarios WHERE login = ? AND senha = ?';
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).json({ error: 'Login e/ou senha não informados' });
  }
  console.log(login);
  console.log(senha);

  const params = [login.toLowerCase(), senha.toLowerCase()];
  const result = await conn.query(sql, params);

  if (result.rowCount === 1) {
    // Initialize session
    req.session.start();

    req.session.set('logged', true);
    req.session.set('typeofuser', 1);

    res.redirect('../../Front/PhotoFolio/index.html');
  } else {
    console.log("Usuário inexistente!");
    // Handle login failure
    // res.redirect('../views/login.php?erro=1');
  }
};
console.log("Teste depois da requisição")