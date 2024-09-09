

function inserirAdm_gerente() {
    
    const formElement = document.getElementById('admin-form');
    var login = document.getElementById("loginAdm").value;
    var senha = document.getElementById("senhaAdm").value;
    var nomeAdm = document.getElementById("nomeAdm").value;
    var emailAdm = document.getElementById("emailAdm").value;
    var telefone = document.getElementById("telefoneAdm").value;
    var idUsuario = null;
    var errorLogin = document.getElementById("errorLoginExistente");
    errorLogin.style.display = 'none';

    const radio = document.querySelector('.chekGestor input[type="radio"]');

    // Valida se o usuario selecionou as opções de gestor
    var idGestor = radio.checked ? document.getElementById("input1").value : null;
    var areaGestor = radio.checked ? document.getElementById("input2").value : null;


    var confirmarSenha = document.getElementById("Confirm-senhaAdm").value;
   
    if(confirmarSenha != senha){
      // Cria uma div de mensagem de erro para senha incorreta
      var errorMessageDiv = document.createElement("div");
      errorMessageDiv.innerHTML = "Senhas incompativeis!";
      errorMessageDiv.style.color = "red";
      errorMessageDiv.style.background = "transparent";
      errorMessageDiv.style.marginTop = "-1rem";

      // Obtem o elemento do botão
      var buttonElementerror = document.getElementById("Confirm-senhaAdm");

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

    var Admin = {
        nomeAdm : nomeAdm,
        emailAdm : emailAdm,
        telefone : telefone,
        idUsuario : idUsuario,
        idGestor : idGestor
    };

    var gestor = {
      idGestor : idGestor,
      areaGestor : areaGestor
    }

    if(idGestor != null){

      //valida se identificador de gestor já existe
      fetch(`http://localhost:5500/gestor/${gestor.idGestor}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro na resposta do servidor');
          }
          return response.json();
          })
          .then(data => {
              console.error('Gestor já existente!');
              
          })
          .catch(error => {
            //Cadastra o gestor para referenciar ao administrador 
            fetch('http://localhost:5500/gestor', {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(gestor)
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
              }
              return response.json();
            })
            .then(data=> {
              if (data.isSave) {
                

                
              }
            })
          .catch(error => {
              console.error(error);
            });


          });

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
                    //Cadastrou o usuário então busca idUsuario para cadastrar o administrador
                    var login = usuario.login;
                    fetch(`http://localhost:5500/usuario/${login}`)
                    .then(response => {
                        if (!response.ok) {
                          throw new Error('Erro na resposta do servidor');
                        }
                        return response.json();
                        })
                        .then(data => {

                                Admin.idUsuario = data[0].idUsuario;
                                var user = data[0];
                            //Cadastra o administrador
                            fetch('http://localhost:5500/administrador', {
                                method: "POST",
                                headers: {
                                'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(Admin)
                            })
                            .then(response => {
                                if (!response.ok) {
                                throw new Error('Erro na resposta do servidor');
                                }
                                return response.json();
                            })
                            .then(data=> {
                                
                                console.log('Usuário cadastrado com sucesso!');
                                //Referencia o administrador ao seu usuario
                                fetch("http://localhost:5500/Administrador")

                                    .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Erro na resposta do servidor');
                                    }
                                    return response.json();
                                    })
                                    .then(data => {

                                        data.forEach(Adm => {
                                            
                                            if((Adm.idUsuario) == (user.idUsuario)){
                                                

                                                fetch(`http://localhost:5500/usuario`, {
                                                    method: 'PUT',
                                                    headers: {
                                                      'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify(Adm)
                                                    })
                                                    .then(response => {
                                                      if (response.ok) {
                                                        return response.json();
                                                      } else {
                                                        throw new Error('Erro ao referenciar usuario ao administrador!');
                                                      }
                                                    })
                                                    .then(data => {
                                                      console.log('sucesso:', data);
                                                      // Cria uma div de mensagem de sucesso
                                                      var successMessageDiv = document.createElement("div");
                                                      successMessageDiv.innerHTML = "Usuário criado com sucesso!";
                                                      successMessageDiv.style.color = "green";
                                                      successMessageDiv.style.fontSize = "18px";
                                                      successMessageDiv.style.padding = "10px";
                                                      successMessageDiv.style.border = "1px solid green";
                                                      successMessageDiv.style.borderRadius = "5px";
                                                      successMessageDiv.style.background = "lightgreen";
                                                      successMessageDiv.style.marginBottom = "1rem";

                                                      // Obtem o elemento do botão
                                                      var buttonElement = document.getElementById("salvarAdm");

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

                                            }
                                        });
                                    })
                                    .catch(error => {
                                    console.error("Erro ao obter os Administradores:", error);
                                });
                                
                            })
                            .catch(error => {
                                console.error(error);
                            });
                            
                        })
                        .catch(error => {
                            console.error("Erro ao Cadastrar o usuario para o administardor:", error);
                        });
                    
                    }
                })
                .catch(error => {
                    console.error(error);
                });
              
            });
    

    return false;

}


function AtualizarTabelaAdministradores(){
  

    fetch("http://localhost:5500/administrador")
  
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta do servidor');
        }
        return response.json();
      })
      .then(data => {
        
         const corpoTabelaAdm = document.getElementById("corpoTabelaAdministradores");
        //  const modalEditar = document.getElementById('modal-edit');
        //  const salvarBtn = document.getElementById('btnSalvar');
         let selectedAdminId = null;
  
         corpoTabelaAdm.innerHTML = '';
    
        data.forEach(Adm => {
          const row = document.createElement("tr");
    
    
          const idCell = document.createElement("td");
          idCell.textContent = Adm.idAdministrador;
          row.appendChild(idCell);

          const gestorCell = document.createElement("td");
          gestorCell.textContent = Adm.idGestor;
          row.appendChild(gestorCell);
    
          const nomeAdCell = document.createElement("td");
          nomeAdCell.textContent = Adm.nomeAD;
          row.appendChild(nomeAdCell);
    
          const mailCell = document.createElement("td");
          mailCell.textContent = Adm.email;
          mailCell.className = "emailAdm";
          row.appendChild(mailCell);


          const telefoneCell = document.createElement("td");
          telefoneCell.textContent = Adm.telefone;
          row.appendChild(telefoneCell);

          
    
          corpoTabelaAdm.appendChild(row);
    
    
          const opcoesCell = document.createElement("td");
          

          const editarButton = document.createElement("button");
          editarButton.textContent = "";
          editarButton.className = "btn-lapis";
          const buttonUrl = getComputedStyle(editarButton).backgroundImage;
          const imageUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-editar-24.png';

          editarButton.style.backgroundImage = `url('${imageUrl}')`;
          opcoesCell.appendChild(editarButton);
  
          editarButton.addEventListener("click", function() {
            sessionStorage.setItem('adminObject', JSON.stringify(Adm)); //armazeno objeto na session para que seja acessado pelo form de edição
            window.location.href = '../../../../Front/PhotoFolio/CadastroUsuario.html?tipo=admin';
            selectedAdminId = Adm.idAdministrador;//Armazeno em uma variavel pra que não sobrecreva no loop
          });

    
    
          const excluirButton = document.createElement("button");
          excluirButton.textContent = "";
          excluirButton.className = "btn-lixo";
          const imagelixoUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-trash-can-24.png';

          excluirButton.style.backgroundImage = `url('${imagelixoUrl}')`;
  
          opcoesCell.appendChild(excluirButton);

    
          excluirButton.addEventListener("click", function() {
            excluirAdm_gerente(Adm);
            
          });
    
          
  
       
  
  
    
          row.appendChild(opcoesCell);
    
    
    
        });
      })
      .catch(error => {
        console.error("Erro ao obter os Adm:", error);
    });
  
  }







function excluirAdm_gerente(Adm) {
    fetch(`http://localhost:5500/administrador/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Adm)
    })
      .then(response => {
        if (response.ok) {
          console.log('Administrador excluído com sucesso');
          AtualizarTabelaAdministradores();
        } else {
          console.error('Erro ao excluir o administrador');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir Administrador:', error);
      });

      
}


function editarAdm_gerente() {

  const AdmOriginal = JSON.parse(storedAdminObject);
    
  var login = document.getElementById("loginAdm").value;
  var senha = document.getElementById("senhaAdm").value;
  var nomeAdm = document.getElementById("nomeAdm").value;
  var emailAdm = document.getElementById("emailAdm").value;
  var telefone = document.getElementById("telefoneAdm").value;
  var idUsuario = null;
  

  var errorLogin = document.getElementById("errorLoginExistente");

  const radio = document.querySelector('.chekGestor input[type="radio"]');

  // Valida se o usuario selecionou as opções de gestor, se estiver selecionado pega o value, se não atriubui false ao valor
  var idGestor = radio.checked ? document.getElementById("input1").value : null;
  var areaGestor = radio.checked ? document.getElementById("input2").value : null;


  var confirmarSenha = document.getElementById("Confirm-senhaAdm").value;
   
    if(confirmarSenha != senha){
      // Cria uma div de mensagem de erro para senha incorreta
      var errorMessageDiv = document.createElement("div");
      errorMessageDiv.innerHTML = "Senhas incompativeis!";
      errorMessageDiv.style.color = "red";
      errorMessageDiv.style.background = "transparent";
      errorMessageDiv.style.marginTop = "-1rem";

      // Obtem o elemento do botão
      var buttonElementerror = document.getElementById("Confirm-senhaAdm");

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

  var Admin = {
      nomeAdm : nomeAdm,
      emailAdm : emailAdm,
      telefone : telefone,
      idUsuario : idUsuario,
      idGestor : idGestor
  };

  var gestor = {
    idGestor : idGestor,
    areaGestor : areaGestor
  }

  if(idGestor != null){

    //valida se identificador de gestor já existe
    fetch(`http://localhost:5500/gestor/${gestor.idGestor}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        return response.json();
        })
        .then(data => {
            
            
        })
        .catch(error => {
          //Cadastra o gestor para referenciar ao administrador 
          fetch('http://localhost:5500/gestor', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(gestor)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro na resposta do servidor');
            }
            return response.json();
          })
          .then(data=> {
            if (data.isSave) {
              

              
            }
          })
        .catch(error => {
            console.error(error);
          });


        });

  }

  

  fetch(`http://localhost:5500/usuarios/${AdmOriginal.idUsuario}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
                })
                .then(data => {
                  //Pego o login e senha do usuário original antes da edição
                    data.forEach(user => {
                        if(user.idUsuario === AdmOriginal.idUsuario){
                            document.getElementById('loginAdm').value = user.login;
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
                                              
                                        ;
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

  


               
                  //Edita os dados do administrador
                  fetch(`http://localhost:5500/administrador/${AdmOriginal.idAdministrador}`, {
                    method: "PUT",
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Admin)
                    })
                    .then(response => {
                      if (response.ok) {
                        return response.json();
                      } else {
                        throw new Error('Erro ao editar Administrador');
                      }
                    })
                    .then(data=> {
                        // If the form submission is successful, create a success message div
                        var successMessageDiv = document.createElement("div");
                        successMessageDiv.innerHTML = "Usuário editado com sucesso!";
                        successMessageDiv.style.color = "green";
                        successMessageDiv.style.fontSize = "18px";
                        successMessageDiv.style.padding = "10px";
                        successMessageDiv.style.border = "1px solid green";
                        successMessageDiv.style.borderRadius = "5px";
                        successMessageDiv.style.background = "lightgreen";
                        successMessageDiv.style.marginBottom = "1rem";

                        // Get the button element
                        var buttonElement = document.getElementById("salvarAdm");

                        // Insert the success message div before the button element
                        buttonElement.parentNode.insertBefore(successMessageDiv, buttonElement);


                        // You can also add a timeout to remove the success message after a few seconds
                        setTimeout(function() {
                          successMessageDiv.remove();
                        }, 5000);
                        
                        console.log('Todos os dados salvos com sucesso!');
                        
                    })
                    .catch(error => {
                        console.error(error);
                    });
                
                

              
                  
            
          
  

  return false;

}




