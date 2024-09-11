const porta = 5500;

const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const session = require('express-session');
const Connection = require('../src/dao/connection.js');
const controlerLogin = require('../src/Controlers/controlerLogin.js');
const controlerCursos = require('../src/Controlers/controlerCursos.js');
const controlerTurmas = require('../src/Controlers/controlerTurmas.js');
const controlerAdm = require('../src/Controlers/Administrador.js');
const controlerAluno = require('../src/Controlers/Aluno.js');
const controlerMatriculas = require('../src/Controlers/Matriculas.js');
const controlerAulas = require('../src/Controlers/Aula.js');
const Sequelize = require('sequelize');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const base64 = require('base64-js');
const serveStatic = require('serve-static');
const upload = multer();
const bancoDados = require('./bancoDados');
const { SourceTextModule } = require('vm');
const { sourceMapsEnabled } = require('process');
const baseDir = path.join(__dirname, '..');
const diretorio = path.join(baseDir, '..');

module.exports = new Sequelize('panc', 'root', 'P@mell@1999', {
  host: 'localhost',
  dialect: 'mysql',
  // Outras opções de configuração, se necessário
});

// Controle de origem
app.use(cors({
  origin: '*',
  methods: ['GET','PUT', 'POST', 'OPTIONS', 'DELETE'],
  headers: ['Content-Type']
}));

app.use(bodyParser.json());
app.use(express.json()); // Habilita o parsing de JSON
app.use(express.urlencoded({ extended: true })); // Habilita o parsing de URL-encoded



// Define a rota OPTIONS para /cursos
app.options('/cursos', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});

// Define a rota OPTIONS para /Turmas
app.options('/Turmas', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});



// Define a rota OPTIONS para /user
app.options('/usuario', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});

// Define a rota OPTIONS para /user
app.options('/usuarios', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});




// Define a rota OPTIONS para /administrator
app.options('/administrador', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});

// Define a rota OPTIONS para /gestor
app.options('/gestor', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});

// Define a rota OPTIONS para /gestor
app.options('/aluno', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});

// Define a rota OPTIONS para /matriculas
app.options('/matriculas', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});

// Define a rota OPTIONS para /aula
app.options('/aula', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});

// Define a rota OPTIONS para /frequencia
app.options('/frequencia', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});





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


// login do usuário
app.post('/login', (req, res) => {
  const user = req.body;
  console.log('teste de chegada no servidor');
  controlerLogin.getUser(user)
    .then(response => {
      if (response.isLoggedIn) {
        res.status(200).json({ 
          isLoggedIn: true,
          newUrl: 'http://127.0.0.1:5500/Front/PhotoFolio/indexADM.html'
        });
        
      } else {
        res.status(400).json(response);
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});



// Salva 1 curso
app.post('/cursos', (req, res, next) => {
  
  if (!req.body) {
    return res.status(400).send('Requisição inválida');
  }

  const curse = req.body;
  controlerCursos.putCurse(curse)
   .then(response => {
      if (response.isSave) {
        res.status(200).json({ 
          isSave: true
        });
        
      } else {
        res.status(400).json(response);
      }
    })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});



// // Busca todos os cursos
app.get('/cursos', (req, res, next) => {
  
  controlerCursos.getCourses()
  .then(response => {
    if (response.cursos) {
      res.status(200).json(response.cursos); // Return the courses data
      // console.log(response.cursos)
    } else {
      res.status(400).json(response);
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// // Deleta curso
app.delete('/cursos/:id', (req, res, next) => {
  const courseId = req.params.id;

  controlerCursos.deleteCourse(courseId)
  .then(response => {
    if (response.isDeleted) {
      res.status(200).json({ message: 'Curso excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Curso não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// // Edita curso
app.put('/cursos/:id', (req, res, next) => {
  const courseId = req.params.id;
  const curso = req.body;
  
  controlerCursos.updateCourse(courseId, curso)
  .then(response => {
    if (response.isUpdated) {
      res.status(200).json({ message: 'Curso atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Curso não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// Salva 1 Turma
app.post('/Turmas', (req, res, next) => {
  
  if (!req.body) {
    return res.status(400).send('Requisição inválida');
  }

  const Turma = req.body;
  
  controlerTurmas.putTurma(Turma)
   .then(response => {
      if (response.isSave) {
        res.status(200).json({ 
          isSave: true
        });
        
      } else {
        res.status(400).json(response);
      }
    })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// // Busca todas as Turmas
app.get('/Turmas', (req, res, next) => {
  
  controlerTurmas.getTurmas()
  .then(response => {
    if (response.Turmas) {
      res.status(200).json(response.Turmas); // Return the turmas data
      // console.log(response.Turmas)
    } else {
      res.status(400).json(response);
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// // Deleta Turma
app.delete('/Turmas/:id', (req, res, next) => {
  const turmaId = req.params.id;

  controlerTurmas.deleteTurma(turmaId)
  .then(response => {
    if (response.isDeleted) {
      res.status(200).json({ message: 'Turma excluída com sucesso' });
    } else {
      res.status(404).json({ message: 'Turma não encontrada' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// // Edita Turma
app.put('/Turmas/:id', (req, res, next) => {
  const turmaId = req.params.id;
  const turma = req.body;
  
  controlerTurmas.updateTurma(turmaId, turma)
  .then(response => {
    if (response.isUpdated) {
      res.status(200).json({ message: 'Turma atualizada com sucesso' });
    } else {
      res.status(404).json({ message: 'Turma não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});




// Salva 1 usuário
app.post('/usuario', (req, res, next) => {
  
  if (!req.body) {
    return res.status(400).send('Requisição inválida');
  }

  const usuario = req.body;
  
  controlerLogin.novoUsuario(usuario)
   .then(response => {
      if (response.isSave) {
        res.status(200).json({ 
        isSave: true
        });
        
      } else {
        res.status(400).json(response);
      }
    })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// Busca 1 usuario
app.get('/usuario/:login', (req, res, next) => {
  const userLogin = req.params.login;
  
  controlerLogin.getUsuario(userLogin)
  .then(response => {
    if (response.usuarioEncontrado) {
      res.status(200).json(response.usuarioEncontrado); // Return the usuario data
    } else {
      res.status(400).json(response);
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// Busca todos os usuarios
app.get('/usuarios/:id', (req, res, next) => {
  const userid = req.params.id;
  
  controlerLogin.getUsuarios(userid)
  .then(response => {
    if (response.usuarioEncontrado) {
      res.status(200).json(response.usuarioEncontrado); // Return the usuario data
    } else {
      res.status(400).json(response);
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// // Edita login e senha do usuario
app.put('/usuarios/:id', (req, res, next) => {
  const userId = req.params.id;
  const usuarioEditado = req.body;
  
  controlerLogin.recuperarSenha(userId, usuarioEditado)
  .then(response => {
    if (response.isUpdated) {
      res.status(200).json({ message: 'Usuario atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Usuario não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});




// Define a rota OPTIONS para /responsavel
app.options('/responsavel/', (req, res) => {
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send(200);
});



// Salva 1 Responsavel
app.post('/responsavel/', (req, res, next) => {
  
  if (!req.body) {
    return res.status(400).send('Requisição inválida');
  }

  const responsavel = req.body;
  
 
  controlerAluno.inserirResponsavel(responsavel)
   .then(response => {
     if (response.isSave) {
       res.status(200).json(response.isSave);
       
     } else {
        res.status(400).json(response);
      }
    })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// Busca 1 responsavel
app.get('/responsavel/:idResponsavel', (req, res, next) => {
  const responsavel = req.params.idResponsavel;
  
  controlerAluno.getResponsavel(responsavel)
  .then(response => {
    if (response.usuarioEncontrado) {
      res.status(200).json(response.usuarioEncontrado); // Return the usuario data
    } else {
      res.status(400).json(response);
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// // Edita responsavel
app.put('/responsavel', (req, res, next) => {
  const responsavel = req.body; 

  
  controlerAluno.updateResponsavel(responsavel)
  .then(response => {
    if (response.isUpdated) {
      res.status(200).json({ message: 'Responsavel atualizado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Responsavel não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// Salva 1 Aluno
app.post('/aluno', (req, res, next) => {
  
  if (!req.body) {
    return res.status(400).send('Requisição inválida');
  }

  const aluno = req.body;
  
 
  controlerAluno.inserirAluno(aluno)
   .then(response => {
     if (response.isSave) {
       res.status(200).json(response.isSave);
       
     } else {
        res.status(400).json(response);
      }
    })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// Busca todos os Alunos
app.get('/aluno', (req, res, next) => {
  
  controlerAluno.getAlunos()
  .then(response => {
    if (response.Alunos) {
      res.status(200).json(response.Alunos); // Return Alunos data
     
    } else {
      res.status(400).json(response);
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
}); 

// // Edita Aluno
app.put('/aluno', (req, res, next) => {
  const aluno = req.body; 

  
  controlerAluno.editarAluno(aluno)
  .then(response => {
    if (response.isUpdated) {
      res.status(200).json({ message: 'Aluno atualizado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// // Deleta Aaluno
app.delete('/aluno', (req, res, next) => {
  const aluno = req.body; 

  controlerAluno.excluirAluno(aluno)
  .then(response => {
    if (response.isDeleted) {
      res.status(200).json({ message: 'Aluno excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// Salva 1 administrador
 app.post('/administrador', (req, res, next) => {
  
   if (!req.body) {
     return res.status(400).send('Requisição inválida');
   }

   const Admin = req.body;
   
  
   controlerAdm.inserirAdm_gerente(Admin)
    .then(response => {
      if (response.isSave) {
        res.status(200).json({ 
        isSave: true
        });
        
      } else {
         res.status(400).json(response);
       }
     })
    .catch(error => {
       console.error(error);
       res.status(500).send('Erro interno do servidor');
     });
});



// Busca todos os Administradores
 app.get('/administrador', (req, res, next) => {
  
   controlerAdm.getAdministrador()
   .then(response => {
     if (response.Adm) {
       res.status(200).json(response.Adm); // Return Adms data
      
     } else {
       res.status(400).json(response);
     }
   })
    .catch(error => {
       console.error(error);
       res.status(500).send('Erro interno do servidor');
     });
 }); 




// // Edita usuario
app.put('/usuario', (req, res, next) => {
  const usuario = req.body; 

  
  controlerLogin.updateUsuario(usuario)
  .then(response => {
    if (response.isUpdated) {
      res.status(200).json({ message: 'usuario atualizado com sucesso!' });
    } else {
      res.status(404).json({ message: 'usuario não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// // Deleta Administrador
app.delete('/administrador', (req, res, next) => {
  const adm = req.body; 

  controlerAdm.excluirAdm_gerente(adm)
  .then(response => {
    if (response.isDeleted) {
      res.status(200).json({ message: 'Administrador excluído com sucesso' });
    } else {
      res.status(404).json({ message: 'Administrador não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});



// Busca 1 gestor
app.get('/gestor/:idgestor', (req, res, next) => {
  const gestor = req.params.idgestor;
  
  controlerAdm.getGestor(gestor)
  .then(response => {
    if (response.usuarioEncontrado) {
      res.status(200).json(response.usuarioEncontrado); // Return the usuario data
    } else {
      res.status(400).json(response);
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// Salva 1 gestor
app.post('/gestor', (req, res, next) => {
  
  if (!req.body) {
    return res.status(400).send('Requisição inválida');
  }

  const gestor = req.body;
  controlerAdm.putGestor(gestor)
   .then(response => {
      if (response.isSave) {
        res.status(200).json({ 
          isSave: true
        });
        
      } else {
        res.status(400).json(response);
      }
    })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// // Edita dados do administrador
app.put('/administrador/:id', (req, res, next) => {
  const admId = req.params.id;
  const admEditado = req.body;
  
  controlerAdm.editarAdm_gerente(admId, admEditado)
  .then(response => {
    if (response.isUpdated) {
      res.status(200).json({ message: 'Administrador atualizado com sucesso' });
    } else {
      res.status(404).json({ message: 'Administrador não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// Busca todas as matriculas
app.get('/matriculas', (req, res, next) => {
  
  controlerMatriculas.getMatriculas()
  .then(response => {
    if (response.Matriculas) {
      res.status(200).json(response.Matriculas); // Return Alunos data
     
    } else {
      res.status(400).json(response);
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
}); 


// Salva 1 Aula
app.post('/aula', (req, res, next) => {
  
  if (!req.body) {
    return res.status(400).send('Requisição inválida');
  }

  const aula = req.body;
  
 
  controlerAulas.inserirAula(aula)
   .then(response => {
     if (response.isSave) {
      
      res.status(200).json(response.isSave);
       
     } else {
        res.status(400).json(response);
      }
    })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});




// Salva 1 matricula
app.post('/matriculas', (req, res, next) => {
  
  if (!req.body) {
    return res.status(400).send('Requisição inválida');
  }

  const matricula = req.body;
  controlerMatriculas.inserirMatricula(matricula)
   .then(response => {
      if (response.isSave) {
        res.status(200).json({ 
          isSave: true
        });
        
      } else {
        res.status(400).json(response);
      }
    })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});



// // Deleta matricula
app.delete('/matriculas', (req, res, next) => {
  const matricula = req.body; 

  controlerMatriculas.excluirMatricula(matricula)
  .then(response => {
    if (response.isDeleted) {
      res.status(200).json({ message: 'Aluno desmatriculado com sucesso' });
    } else {
      res.status(404).json({ message: 'Matricula não encontrada' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});

// Busca todas as aulas
app.get('/aula', (req, res, next) => {
  
  controlerAulas.getAulas()
  .then(response => {
    if (response.Aulas) {
      res.status(200).json(response.Aulas); // Return Alunos data
     
    } else {
      res.status(400).json(response);
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// // Deleta Aula
app.delete('/aula/:id', (req, res, next) => {
  const aulaId = req.params.id;

  controlerAulas.excluirAula(aulaId)
  .then(response => {

    if (response.isDeleted) {
      console.log('foi deletado');
      res.status(200).json({ message: 'Aula excluida com sucesso' });
    } else {
      res.status(404).json({ message: 'Aula não encontrada' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// Busca todas as frequencias
app.get('/frequencia', (req, res, next) => {
  
  controlerAulas.getFrequencias()
  .then(response => {
    if (response.frequencia) {
      res.status(200).json(response.frequencia); // Return Alunos data
     
    } else {
      res.status(400).json(response);
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});


// // Edita dados da aula
app.put('/aula/:id', (req, res, next) => {
  const aulaId = req.params.id;
  const aulaEditada = req.body;
  
  controlerAulas.editarAula(aulaId, aulaEditada)
  .then(response => {
    if (response.isUpdated) {
      res.status(200).json({ message: 'Aula atualizada com sucesso' });
    } else {
      res.status(404).json({ message: 'Aula não encontrado' });
    }
  })
   .catch(error => {
      console.error(error);
      res.status(500).send('Erro interno do servidor');
    });
});
























// Pega as rotas que não combinam com as já definidas
app.use((req, res, next) => {
  res.status(405).send('Method Not Allowed');
});


app.listen(porta, () => {
  console.log(`Servidor agora executando na porta ${porta}.`)
});




