

function inserirAluno() {

    const formElement = document.getElementById('user-form');  
    var login = document.getElementById("loginAluno").value;
    var senha = document.getElementById("senhaAluno").value;
    var nomeAluno = document.getElementById("nomeAluno").value;
    var cpfAluno = document.getElementById("cpfAluno").value;
    var idade = document.getElementById("idadeAluno").value;
    var turmaAluno = document.getElementById("Select-Turma").value;
    var telefoneAluno = document.getElementById("telefoneAluno").value;
    var emailAluno = document.getElementById("emailAluno").value;
    var enderecoAluno = document.getElementById("enderecoAluno").value;

    var nomeResponsavel = document.getElementById("nomeResponsavel").value;
    var emailResponsavel = document.getElementById("emailResponsavel").value;
    var telefoneResponsavel = document.getElementById("telefoneResponsavel").value;
    var enderecoResponsavel = document.getElementById("enderecoResponsavel").value;
    var idUsuario = null;
    var idResponsavel = null;
    var errorLogin = document.getElementById("errorLoginExistenteAluno");
    errorLogin.style.display = 'none';

    var confirmarSenha = document.getElementById("Confirm-senhaAluno").value;
   
    if(confirmarSenha != senha){
      // Cria uma div de mensagem de erro para senha incorreta
      var errorMessageDiv = document.createElement("div");
      errorMessageDiv.innerHTML = "Senhas incompativeis!";
      errorMessageDiv.style.color = "red";
      errorMessageDiv.style.background = "transparent";
      errorMessageDiv.style.marginTop = "-1rem";

      // Obtem o elemento do botão
      var buttonElementerror = document.getElementById("Confirm-senhaAluno");

      // Insere a div da mensagem de sucesso abaixo do botão
      buttonElementerror.parentNode.insertBefore(errorMessageDiv, buttonElementerror.nextSibling);


      // Adiciona um tempo limite para remover a mensagem de sucesso após alguns segundos
      setTimeout(function() {
        errorMessageDiv.remove();
      }, 5000);

      return false;


    }
    
    
    var usuario = {
        login : login,
        senha : senha
    };

    var Aluno = {
      nomeAluno : nomeAluno,
      cpfAluno : cpfAluno,
      idade : idade,
      turmaAluno : turmaAluno,
      telefoneAluno : telefoneAluno,
      emailAluno : emailAluno,
      enderecoAluno : enderecoAluno,
      idResponsavel : idResponsavel,
      idUsuario : idUsuario
    };

    var responsavel = {
      nomeResponsavel : nomeResponsavel,
      emailResponsavel : emailResponsavel,
      telefoneResponsavel : telefoneResponsavel,
      enderecoResponsavel : enderecoResponsavel
    }


     
    

    


        //Valida se usuário já existe com o mesmo login
        fetch(`http://localhost:5500/usuario/${login}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }
            return response.json();
            })
            .then(data => {
                errorLogin.style.display = 'block';
                console.error('Login já utilizado!');
            })
            .catch(error => {
                //Cadastra o usuario
                errorLogin.style.display = 'none';
                fetch('http://localhost:5500/usuario', {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(usuario)
                })
                .then(response => {
                    if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                    }
                    return response.json();
                })
                .then(data=> {
                    if (data.isSave) {
                    //Cadastrou o usuário então busca idUsuario para cadastrar o aluno
                    var login = usuario.login;
                    fetch(`http://localhost:5500/usuario/${login}`)
                    .then(response => {
                        if (!response.ok) {
                          throw new Error('Erro na resposta do servidor');
                        }
                        return response.json();
                        })
                        .then(data => {

                                Aluno.idUsuario = data[0].idUsuario;
                                var user = data[0];
                                //Cadastra o responsavel 
                                fetch('http://localhost:5500/responsavel/', {
                                  method: "POST",
                                  headers: {
                                  'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify(responsavel)
                              })
                              .then(response => {
                                  if (!response.ok) {
                                  throw new Error('Erro na resposta do servidor');
                                  }
                                  return response.json();
                              })
                              .then(data=> {
                                  
                                  Aluno.idResponsavel = data[0].idResponsavel;
                                  // Cadastra Aluno
                                  fetch(`http://localhost:5500/aluno`, {
                                    method: 'POST',
                                    headers: {
                                      'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(Aluno)
                                    })
                                    .then(response => {
                                      if (response.ok) {
                                        return response.json();
                                      } else {
                                        throw new Error('Erro ao referenciar usuario ao aluno!');
                                      }
                                    })
                                    .then(data => {
                                      console.log('sucesso:', data);
                                      // Cria uma div de mensagem de sucesso
                                      var successMessageDiv = document.createElement("div");
                                      successMessageDiv.innerHTML = "Usuário Criado com sucesso!";
                                      successMessageDiv.style.color = "green";
                                      successMessageDiv.style.fontSize = "18px";
                                      successMessageDiv.style.padding = "10px";
                                      successMessageDiv.style.border = "1px solid green";
                                      successMessageDiv.style.borderRadius = "5px";
                                      successMessageDiv.style.background = "lightgreen";
                                      successMessageDiv.style.marginBottom = "1rem";

                                      // Obtem o elemento do botão
                                      var buttonElement = document.getElementById("salvarAluno");

                                      // Insere a div da mensagem de sucesso antes do elemento do botão
                                      buttonElement.parentNode.insertBefore(successMessageDiv, buttonElement);


                                      // Adiciona um tempo limite para remover a mensagem de sucesso após alguns segundos
                                      setTimeout(function() {
                                        successMessageDiv.remove();
                                      }, 5000);

                                      formElement.reset();
                                    
                                    })
                                    .catch(error => {
                                      console.error('Erro:', error);
                                    });

                                  
                              })
                              .catch(error => {
                                  console.error(error);
                              });


                           
                            
                        })
                        .catch(error => {
                            console.error("Erro ao Cadastrar o usuario para o aluno:", error);
                        });
                    
                    }
                })
                .catch(error => {
                    console.error(error);
                });
              
            });
    

    return false;

}


function AtualizarTabelaAlunos(){
 

    fetch("http://localhost:5500/aluno")
  
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta do servidor');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        
         const corpoTabelaAluno = document.getElementById("corpoTabelaAlunos");
         let selectedAlunoId = null;
  
         corpoTabelaAluno.innerHTML = '';
    
        data.forEach(Aluno => {
          const row = document.createElement("tr");
    
    
          
    
          const nomeAlCell = document.createElement("td");
          nomeAlCell.textContent = Aluno.nomeAl;
          nomeAlCell.className = "emailAluno";
          nomeAlCell.className = "alinharConteudoCell";
          row.appendChild(nomeAlCell);

          const idadeCell = document.createElement("td");
          idadeCell.textContent = Aluno.idade;
          idadeCell.className = "alinharConteudoCell";
          row.appendChild(idadeCell);
    
          const cpfCell = document.createElement("td");
          cpfCell.textContent = Aluno.cpf;
          cpfCell.className = "alinharConteudoCell";
          row.appendChild(cpfCell);

          const telefoneCell = document.createElement("td");
          telefoneCell.textContent = Aluno.telefone;
          telefoneCell.className = "alinharConteudoCell";
          row.appendChild(telefoneCell);

          const emailCell = document.createElement("td");
          emailCell.textContent = Aluno.email;
          emailCell.className = "alinharConteudoCell";
          row.appendChild(emailCell);

          const enderecoCell = document.createElement("td");
          enderecoCell.textContent = Aluno.endereco;
          enderecoCell.className = "cellGrandeAluno";
          row.appendChild(enderecoCell);

          const responsavelCell = document.createElement("td");
          
          const ResponsavelButton = document.createElement("button");
          ResponsavelButton.textContent = "";
          ResponsavelButton.className = "btn-lapis";
          responsavelCell.className = "alinharConteudoCell";
          const buttonUrlResp = getComputedStyle(ResponsavelButton).backgroundImage;
          const imageUrlRespo = buttonUrlResp + '/back/imagens/iconesDoSistema/icons8-sobre-nós-masculino-30.png';
          ResponsavelButton.style.backgroundImage = `url('${imageUrlRespo}')`;
          responsavelCell.appendChild(ResponsavelButton);

          ResponsavelButton.addEventListener("click", function() {
            document.getElementById('modal-Responsavel').style.display = 'flex';
            const inputNomeResp = document.getElementById('nomeResponsavel');
            const inputtelefoneResp = document.getElementById('telefoneResponsavel');
            const inputEmailResp = document.getElementById('emailResponsavel');
            const inputEnderecoResp = document.getElementById('enderecoResponsavel');
            // inputNomeResp.value = ;
            fetch(`http://localhost:5500/responsavel/${Aluno.idResponsavel}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta do servidor');
                    }
                    return response.json();
                    })
                    .then(data => {

                      inputNomeResp.value = data[0].nomeResponsavel;
                      inputtelefoneResp.value = data[0].telefone;
                      inputEmailResp.value = data[0].email;
                      inputEnderecoResp.value = data[0].endereco;


                    })
                    .catch(error => {
                        console.log(error);
                    });
          });


          row.appendChild(responsavelCell);
    
          corpoTabelaAluno.appendChild(row);
    
    
          const opcoesCell = document.createElement("td");
          

          const editarButton = document.createElement("button");
          editarButton.textContent = "";
          editarButton.className = "btn-lapis";
          const buttonUrl = getComputedStyle(editarButton).backgroundImage;
          const imageUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-editar-24.png';

          editarButton.style.backgroundImage = `url('${imageUrl}')`;
          opcoesCell.appendChild(editarButton);
  
          editarButton.addEventListener("click", function() {
            sessionStorage.setItem('AlunoinObject', JSON.stringify(Aluno)); //armazeno objeto na session para que seja acessado pelo form de edição
            window.location.href = '../../../../Front/PhotoFolio/CadastroUsuario.html?tipo=user';
            selectedAlunoId = Aluno.idAlunoinistrador;//Armazeno em uma variavel pra que não sobrecreva no loop
          });

    
    
          const excluirButton = document.createElement("button");
          excluirButton.textContent = "";
          excluirButton.className = "btn-lixo";
          const imagelixoUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-trash-can-24.png';

          excluirButton.style.backgroundImage = `url('${imagelixoUrl}')`;
          opcoesCell.className = "alinharConteudoCell";
          opcoesCell.appendChild(excluirButton);

    
          excluirButton.addEventListener("click", function() {
            excluirAluno(Aluno);
            
          });
    
          
  
       
  
  
    
          row.appendChild(opcoesCell);
    
    
    
        });
      })
      .catch(error => {
        console.error("Erro ao obter os Aluno:", error);
    });
  
  }







function excluirAluno(Aluno) {
    fetch(`http://localhost:5500/aluno/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Aluno)
    })
      .then(response => {
        if (response.ok) {
          console.log('Alunoinistrador excluído com sucesso');
          AtualizarTabelaAlunos();
        } else {
          console.error('Erro ao excluir o Alunoinistrador');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir Alunoinistrador:', error);
      });

      
}


function editarAluno() {

  const AlunoOriginal = JSON.parse(storedAlunoinObject);
    
  var login = document.getElementById("loginAluno").value;
  var senha = document.getElementById("senhaAluno").value;
  var nomeAluno = document.getElementById("nomeAluno").value;
  var cpfAluno = document.getElementById("cpfAluno").value;
  var idade = document.getElementById("idadeAluno").value;
  var turmaAluno = document.getElementById("Select-Turma").value;
  var telefoneAluno = document.getElementById("telefoneAluno").value;
  var emailAluno = document.getElementById("emailAluno").value;
  var enderecoAluno = document.getElementById("enderecoAluno").value;

  var nomeResponsavel = document.getElementById("nomeResponsavel").value;
  var emailResponsavel = document.getElementById("emailResponsavel").value;
  var telefoneResponsavel = document.getElementById("telefoneResponsavel").value;
  var enderecoResponsavel = document.getElementById("enderecoResponsavel").value;
  var idUsuario = null;
  var errorLogin = document.getElementById("errorLoginExistenteAluno");

  var confirmarSenha = document.getElementById("Confirm-senhaAluno").value;
  
  if(confirmarSenha != senha){
    // Cria uma div de mensagem de erro para senha incorreta
    var errorMessageDiv = document.createElement("div");
    errorMessageDiv.innerHTML = "Senhas incompativeis!";
    errorMessageDiv.style.color = "red";
    errorMessageDiv.style.background = "transparent";
    errorMessageDiv.style.marginTop = "-1rem";

    // Obtem o elemento do botão
    var buttonElementerror = document.getElementById("Confirm-senhaAluno");

    // Insere a div da mensagem de sucesso abaixo do botão
    buttonElementerror.parentNode.insertBefore(errorMessageDiv, buttonElementerror.nextSibling);


    // Adiciona um tempo limite para remover a mensagem de sucesso após alguns segundos
    setTimeout(function() {
      errorMessageDiv.remove();
    }, 5000);

    return false;


  }

 

  
  
  var usuario = {
      login : login,
      senha : senha
  };

  var Aluno = {
    nomeAluno : nomeAluno,
    cpfAluno : cpfAluno,
    idade : idade,
    turmaAluno : turmaAluno,
    telefoneAluno : telefoneAluno,
    emailAluno : emailAluno,
    enderecoAluno : enderecoAluno,
    idResponsavel : AlunoOriginal.idResponsavel,
    idUsuario : idUsuario,
    idAluno : AlunoOriginal.idAluno
  };

  var responsavel = {
    nomeResponsavel : nomeResponsavel,
    emailResponsavel : emailResponsavel,
    telefoneResponsavel : telefoneResponsavel,
    enderecoResponsavel : enderecoResponsavel,
    idResponsavel : AlunoOriginal.idResponsavel
  }

  
 console.log(AlunoOriginal.idUsuario);

  fetch(`http://localhost:5500/usuarios/${AlunoOriginal.idUsuario}`)
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro na resposta do servidor');
      }
      return response.json();
      })
      .then(data => {
        //Pego o login e senha do usuário original antes da edição
          data.forEach(user => {
              if(user.idUsuario === AlunoOriginal.idUsuario){
                  document.getElementById('loginAluno').value = user.login;
                  errorLogin.style.display = 'none';
                  //verifica se o login do usuario foi modificado
                  if(user.login != usuario.login){

                    //Valida se outro usuário já existe com o mesmo login
                    fetch(`http://localhost:5500/usuario/${usuario.login}`)
                      .then(response => {
                          if (!response.ok) {
                              throw new Error('Erro na resposta do servidor');
                          }
                          return response.json();
                          })
                          .then(data => {
                              errorLogin.style.display = 'block';
                              console.error('Login já utilizado!');
                          })
                          .catch(error => {   
                            

                            //Edita o usuario
                              fetch(`http://localhost:5500/usuarios/${user.idUsuario}`, {
                                method: "PUT",
                                headers: {
                                'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(usuario)
                                })
                                .then(response => {
                                  if (response.ok) {
                                    return response.json();
                                  } else {
                                    throw new Error('Erro ao editar usuario');
                                  }
                                })
                                .then(data=> {
                                    
                              
                                    console.log('Usuario editado com sucesso!');

                                    
                                })
                                .catch(error => {
                                    console.error(error);
                                });


                            
                          });


                  }
                  
              }
          });
          
      })
      .catch(error => {
          console.log(error);
      });



          
            
       


          //Edita o responsavel 
            fetch('http://localhost:5500/responsavel/', {
              method: "PUT",
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(responsavel)
            })
            .then(response => {
              if (!response.ok) {
              throw new Error('Erro na resposta do servidor');
            }
              return response.json();
            })
            .then(data=> {
                            
                            // Edita Aluno
                            fetch(`http://localhost:5500/aluno`, {
                              method: 'PUT',
                              headers: {
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(Aluno)
                              })
                              .then(response => {
                                if (response.ok) {
                                  return response.json();
                                } else {
                                  throw new Error('Erro ao editar aluno!');
                                }
                              })
                              .then(data => {
                                console.log('sucesso:', data);
                                // Cria uma div de mensagem de sucesso
                                var successMessageDiv = document.createElement("div");
                                successMessageDiv.innerHTML = "Usuário editado com sucesso!";
                                successMessageDiv.style.color = "green";
                                successMessageDiv.style.fontSize = "18px";
                                successMessageDiv.style.padding = "10px";
                                successMessageDiv.style.border = "1px solid green";
                                successMessageDiv.style.borderRadius = "5px";
                                successMessageDiv.style.background = "lightgreen";
                                successMessageDiv.style.marginBottom = "1rem";

                                // Obtem o elemento do botão
                                var buttonElement = document.getElementById("salvarAluno");

                                // Insere a div da mensagem de sucesso antes do elemento do botão
                                buttonElement.parentNode.insertBefore(successMessageDiv, buttonElement);


                                // Adiciona um tempo limite para remover a mensagem de sucesso após alguns segundos
                                setTimeout(function() {
                                  successMessageDiv.remove();
                                }, 5000);
                              
                              })
                              .catch(error => {
                                console.error('Erro:', error);
                              });  

          
              })
              .catch(error => {
                  console.error(error);
              });

                        




  

  return false;

}




