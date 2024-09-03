

function inserirAdm_gerente() {
    
    var login = document.getElementById("loginAdm").value;
    var senha = document.getElementById("senhaAdm").value;
    var nomeAdm = document.getElementById("nomeAdm").value;
    var emailAdm = document.getElementById("emailAdm").value;
    var telefone = document.getElementById("telefoneAdm").value;
    var idUsuario = null;

    
    
    var usuario = {
        login : login,
        senha : senha
    };

    var Admin = {
        nomeAdm : nomeAdm,
        emailAdm : emailAdm,
        telefone : telefone,
        idUsuario : idUsuario
    };


    //Valida se usuário já existe
    fetch(`http://localhost:5500/usuario/${login}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
        }
        return response.json();
        })
        .then(data => {
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
            // modalEditar.style.display = 'block';
            // selectedAdminId = Adm.idAd;//Armazeno em uma variavel pra que não sobrecreva no loop
          });
    
    
          const excluirButton = document.createElement("button");
          excluirButton.textContent = "";
          excluirButton.className = "btn-lixo";
          const imagelixoUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-trash-can-24.png';

          excluirButton.style.backgroundImage = `url('${imagelixoUrl}')`;
  
          opcoesCell.appendChild(excluirButton);

    
          excluirButton.addEventListener("click", function() {
            excluirAdm_gerente(Adm.idAdministrador);
            
          });
    
          
  
        //   salvarBtn.addEventListener('click', () => {
        //     if (selectedAdminId !== null) { // valido se o Ad foi selecionado
        //     //   editarAd(selectedAdminId); // chamo editar Ad para o id selecionado
        //     //   modalEditar.style.display = 'none'; // fecho a modal
        //     //   selectedAdminId = null; // Reset a variavel local do Ad selecionado.
        //     }
        //   });
  
  
    
          row.appendChild(opcoesCell);
    
    
    
        });
      })
      .catch(error => {
        console.error("Erro ao obter os Adm:", error);
    });
  
  }




function excluirAdm_gerente(idAdministrador) {
    fetch(`http://localhost:5500/administrador/${idAdministrador}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Administrador excluído com sucesso');
          AtualizarTabelaAdministradores();
        } else {
          console.error('Erro ao excluir a Turma');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir Administrador:', error);
      });

      
}

// function editarTurma(idTurma) {
//     var horarioDaTurma = document.getElementById("turmaHorario-Edit").value;
//     var diasDeAulaDaTurma = document.getElementById("DiasDeAula-Edit").value;
//     var AdDaTurma = document.getElementById("Select-Ad-Edit").value;
    

        
//     var Turma = {
//         horarioDaTurma : horarioDaTurma,
//         diasDeAulaDaTurma : diasDeAulaDaTurma ,
//         AdDaTurma: AdDaTurma
//     };

 
    
//   fetch(`http://localhost:5500/Turmas/${idTurma}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(Turma)
//     })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Erro ao editar o Ad');
//       }
//     })
//     .then(data => {
//       console.log('Turma editada com sucesso:', data);
//       document.getElementById('modalTurmaEdit').style.display = 'none';
//       AtualizarTabelaTurmas(); // Call the function to update the table
//     })
//     .catch(error => {
//       console.error('Erro ao editar Turma:', error);
//     });

    
// }


