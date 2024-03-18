const porta = 3003

const express = require('express')
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const Connection = require('../src/dao/connection.js');
const controlerLogin = require('../src/Controlers/controlerLogin.js');
const Sequelize = require('sequelize');
const app = express()
//excluir dps
const bodyParser = require('body-parser') //para usar o body do postman
const fs = require('fs')
const base64 = require('base64-js')

const bancoDados = require('./bancoDados')

module.exports = new Sequelize('panc', 'root', 'P@mell@1999', {
    host: 'localhost',
    dialect: 'mysql',
    // Outras opções de configuração, se necessário
});

//Controle de origem
app.use(cors());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(session({
    secret: 'P@mell@1999',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
  
app.use(bodyParser.urlencoded({ extended: true }));


app.all('/login', (req, res) => {
    if (req.method === 'GET') {
        
    } else if (req.method === 'POST') {
        // console.log(req,res);
        controlerLogin.login(req, res);
    }
});

// app.get('/login', (req, res) => {
//     // Handle GET requests to /login
// });

// app.post('/login', controlerLogin.login);


app.listen(porta, () => {
    console.log(`Servidor agora executando na porta ${porta}.`)
})