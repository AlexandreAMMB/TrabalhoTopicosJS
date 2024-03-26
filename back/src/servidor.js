const porta = 5500

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
const serveStatic = require('serve-static');

const bancoDados = require('./bancoDados')
const baseDir = path.join(__dirname, '..');
const diretorio = path.join(baseDir, '..');





module.exports = new Sequelize('panc', 'root', 'P@mell@1999', {
    host: 'localhost',
    dialect: 'mysql',
    // Outras opções de configuração, se necessário
});

//Controle de origem
app.use(cors());
app.use(express.json()); 

app.use(serveStatic(path.join(diretorio, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(diretorio, '/Front/PhotoFolio'));
});



// Set the MIME type for the .js file extension
app.get('/assets/js/:name', (req, res) => {
    res.type('application/javascript');
    res.sendFile(req.path);
  });
  



app.use(session({
    secret: 'P@mell@1999',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
  
app.use(bodyParser.urlencoded({ extended: true }));


// app.get('/produtos/:user', (req, res, next) => {
//     console.log(user.login);
//     console.log(user.senha);
//     res.send(controlerLogin.getUser(user))
    
// })


// app.get('/login', (req, res, next) => {
//   res.redirect('../../Front/PhotoFolio/indexADM.html');
// });

// app.post('/login', (req, res) => {
//   const user = req.body;

//   // Call the getUser function and pass the user object
//   controlerLogin.getUser(user)
//     .then(userData => {
//       // Handle the resolved value
//       console.log('cheguei ate o servidor');
//       // If the userData is not null, redirect the user to the index.html page
//       if (userData) {
//         console.log('cheguei ate o redirecionamento');
//         res.redirect('../../Front/PhotoFolio/indexADM.html');
//       } else {
//         // Handle the case where the user was not found
//         res.status(401).send('User not found');
//       }
//     })
//     .catch(error => {
//       // Handle the rejected value
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     });
  

// });




app.post('/login', (req, res) => {
  const user = req.body;
  controlerLogin.getUser(user)
    .then(userData => {
      if (userData) {
        res.status(200).json({
          isLoggedIn: true,
          newUrl: 'http://127.0.0.1:5500/Front/PhotoFolio/indexADM.html'
        });
      } else {
        res.status(401).send('User not found');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});





app.listen(porta, () => {
    console.log(`Servidor agora executando na porta ${porta}.`)
})