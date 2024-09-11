

function inserirAula() {
    
    const formElement = document.getElementById('admin-form');
    const elements = formElement.elements;
    var dataAula = document.getElementById("dataAula").value;
    var descricaoAula = document.getElementById("descriçãoAula").value;
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Crie um objeto para armazenar os valores dos checkboxes selecionados
    const selectedCheckboxes = {};

    // Loop pelos checkboxes e adicione os valores dos checkboxes selecionados ao objeto
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedCheckboxes[checkbox.id] = checkbox.value;
      }
    });

    storedTurmainObject = sessionStorage.getItem('TurmainObject');
    const turma = JSON.parse(storedTurmainObject);

    var Aula = {
        idTurma : turma.idTurma,
        dataAula : dataAula,
        descricaoAula : descricaoAula,
        frequencia : selectedCheckboxes
    };

    
    fetch('http://localhost:5500/aula', {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(Aula)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
        }
        return response.json();
    })
    .then(data=> {
        


        // Cria uma div de mensagem de sucesso
        var successMessageDiv = document.createElement("div");
        successMessageDiv.innerHTML = "Aula cadastrada com sucesso!";
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
        console.error(error);
    });

    return false;

}




function AtualizarTabelaTurmas(){
  let addedAlunos = JSON.parse(sessionStorage.getItem('SelectedsAlunosinObject'));

  fetch("http://localhost:5500/matriculas")

    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }
      return response.json();
    })
    .then(data => {
      

      storedTurmainObject = sessionStorage.getItem('TurmainObject');
      const turma = JSON.parse(storedTurmainObject);
      
       const corpoTabelaTurmas = document.getElementById("corpoTabelaTurmas");
      //  const modalEditar = document.getElementById('modalTurmaEdit');
      //  const salvarBtn = document.getElementById('btnEditarTurma');
       let selectedTurmaId = null;

      corpoTabelaTurmas.innerHTML = '';
  
      data.forEach(matricula => {
        const row = document.createElement("tr");
  
  
        const alunoCell = document.createElement("td");

        if(matricula.idTurma == turma.idTurma){
          console.log(matricula.idTurma);

          fetch("http://localhost:5500/aluno")
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
              }
              return response.json();
            })
            .then(data => {
        
          
              data.forEach(aluno => {
              
                if(matricula.idAluno == aluno.idAluno ){

                    
                  

                    alunoCell.textContent = aluno.nomeAl;
                    alunoCell.style.width = "40%";
                    row.appendChild(alunoCell);
      
                    const faltasTurmaCell = document.createElement("td");
                    faltasTurmaCell.textContent = 'faltas';
                    row.appendChild(faltasTurmaCell);
              
                    const ResultadoCell = document.createElement("td");
                    ResultadoCell.textContent = 'resultado';
                    row.appendChild(ResultadoCell);
              
                    corpoTabelaTurmas.appendChild(row);

                    const opcoesMatriculaCell = document.createElement("td");


                    corpoTabelaTurmas.appendChild(row);
              
                    const opcoesCell = document.createElement("td");

                    const checkboxContainer = document.createElement("span"); // Criar um container para o checkbox e label

                    const presencaCheck = document.createElement("input");
                    presencaCheck.type = "checkbox";

                    const label = document.createElement("label");
                    label.textContent = "Presente";
                    label.style.color = "white";
                    label.style.fontSize = "16px";
                    label.style.marginRight = "40%";
                    presencaCheck.id = aluno.idAluno;
                    presencaCheck.value = aluno.idAluno;
                    label.htmlFor = presencaCheck.id;
                    presencaCheck.style.width = "1rem";
                    presencaCheck.style.height = "1rem";
                    presencaCheck.style.marginTop= "0.2rem";
                    presencaCheck.style.paddingRight= "0%";
                    label.style.marginLeft = "-18%";
                    presencaCheck.style.alignContent = "right";
                    opcoesCell.style.display = "none";
                    
                   opcoesCell.className = "frequencia";
                    
                    opcoesCell.appendChild(presencaCheck); // Adicionar o checkbox ao container
                    opcoesCell.appendChild(label); // Adicionar o label ao container

                    
                    opcoesCell.style.alignContent = 'center';
                   

                    row.appendChild(opcoesCell);



                    const desmatricularCell = document.createElement("td");
                    desmatricularCell.textContent = 'Desmatricular';
                    desmatricularCell.className = 'desmatricula';
                    const excluirButton = document.createElement("button");
                    excluirButton.textContent = "";
                    excluirButton.className = "btn-lixo";
                    const buttonUrl = getComputedStyle(excluirButton).backgroundImage;
                    const imagelixoUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-checkbox-indeterminado-24.png';

                    excluirButton.style.backgroundImage = `url('${imagelixoUrl}')`;
              
                    desmatricularCell.appendChild(excluirButton);
                  
                    excluirButton.addEventListener("click", function() {
                      var matricula = {
                        idAluno : aluno.idAluno,
                        idTurma : turma.idTurma
                      }
                      excluirMatricula(matricula);
                      
                    });

                    desmatricularCell.style.alignContent = 'center';
                    row.appendChild(desmatricularCell);






                    addedAlunos.push(aluno.idAluno);



                }
          
              });
              sessionStorage.setItem('SelectedsAlunosinObject', JSON.stringify(addedAlunos));
            })
            .catch(error => {
              console.error("Erro ao obter os cursos:", error);
          });
        
            
           



        }
        
  
  
  
      });
    })
    .catch(error => {
      console.error("Erro ao obter os Turmas:", error);
  });

}

function HistoricoDeAulasPorTurma(){
  let addedAlunos = JSON.parse(sessionStorage.getItem('SelectedsAlunosinObject'));

  fetch("http://localhost:5500/aula")

    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }
      return response.json();
    })
    .then(data => {
      

      const storedTurmainObject = sessionStorage.getItem('TurmainObject');
      const turma = JSON.parse(storedTurmainObject);



        const corpoTabelaTurmas = document.getElementById("corpoTabelaAulas");
         let selectedTurmaId = null;
  
        corpoTabelaTurmas.innerHTML = '';
    
        data.forEach(aula => {
          const row = document.createElement("tr");
    
  
          if(aula.idTurma == turma.idTurma){
          
            const date = new Date(aula.dataAula);
            const dataAula = `${date.getDate()}-${(`0${date.getMonth() + 1}`).slice(-2)}-${date.getFullYear()}`;
            const aulaCell = document.createElement("td");       
            aulaCell.style.width = "20%";
            aulaCell.style.paddingLeft = "2rem";
            aulaCell.style.alignContent = "center";
            aulaCell.textContent = dataAula;
            
            row.appendChild(aulaCell);

            const descricaoCell = document.createElement("td");
            descricaoCell.textContent = aula.descricaoAula;
            descricaoCell.style.width = "60%";
            descricaoCell.style.alignContent= "center";
            row.appendChild(descricaoCell);
      
      
            corpoTabelaTurmas.appendChild(row);

            
      
            const opcoesCell = document.createElement("td");
            const editarButton = document.createElement("button");
            editarButton.textContent = "";
              editarButton.className = "btn-lapis";
              const buttonUrl = getComputedStyle(editarButton).backgroundImage;
              const imageUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-editar-24.png';

              editarButton.style.backgroundImage = `url('${imageUrl}')`;
            opcoesCell.appendChild(editarButton);

            editarButton.addEventListener("click", function() {

               //Limpar formulário antes de setar os novos valores devido ao preenchimento das frequencias
               const formElement = document.getElementById('admin-form');
               formElement.reset(); 

              //Preencher a modal de edição com os valores da aula          
              const dataAulaValue = new Date(aula.dataAula);
              const formattedValue = `${dataAulaValue.getFullYear()}-${String(dataAulaValue.getMonth() + 1).padStart(2, '0')}-${String(dataAulaValue.getDate()).padStart(2, '0')}`;
              document.getElementById("dataAula").value = formattedValue;
              document.getElementById("descriçãoAula").value = aula.descricaoAula;

              //Busca a lista de frequencia da aula
              var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  

              // Loop pelos checkboxes e adicione os valores dos checkboxes selecionados ao objeto
              checkboxes.forEach((checkbox) => {
                const currentCheckbox = checkbox; // Create a closure
              
                fetch("http://localhost:5500/frequencia")
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Erro na resposta do servidor');
                    }
                    return response.json();
                  })
                  .then(data => {
                    data.forEach(presenca => {
                      if (presenca.idAula == aula.idAula && presenca.idAluno == currentCheckbox.id) {
                        currentCheckbox.checked = true;
                      }
                    });
                  })
                  .catch(error => {
                    console.error("Erro ao obter os Turmas:", error);
                  });
              });





              document.getElementById('historicoAula-form').style.display = 'none';
              document.getElementById('admin-form').style.display = 'block';
              const aulas = document.getElementsByClassName('aula');
              for (let i = 0; i < aulas.length; i++) {
                aulas[i].style.display = 'block';
              }

              const opcoes = document.getElementsByClassName('frequencia');
              for (let i = 0; i < opcoes.length; i++) {
                opcoes[i].style.display = 'flex';
              }

              const desmatricular = document.getElementsByClassName('desmatricula');
              for (let i = 0; i < desmatricular.length; i++) {
                desmatricular[i].style.display = 'none';
              }

              document.getElementById('salvarAdm').style.display = 'flex';
              document.getElementById('salvarAdm').style.marginLeft = '45%';
              document.getElementById('admin-form').style.backgroundColor = 'gray';

              sessionStorage.setItem('SelectedAulaEditinObject', JSON.stringify(aula));
              document.getElementById('salvarAdm').style.display = 'none';
              document.getElementById('editarAula').style.display = 'flex';
              // var checkboxes = document.querySelectorAll('input[type="checkbox"]');
              
              // Crie um objeto para armazenar os valores dos checkboxes selecionados
              // const selectedCheckboxes = {};


                
            });

          

            const excluirButton = document.createElement("button");
            excluirButton.textContent = "";
            excluirButton.className = "btn-lixo";
            const imagelixoUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-trash-can-24.png';

            excluirButton.style.backgroundImage = `url('${imagelixoUrl}')`;
      
            opcoesCell.appendChild(excluirButton);
      
            excluirButton.addEventListener("click", function() {
              excluirAula(aula);
              
            });

            opcoesCell.style.alignContent = 'center';
      
            row.appendChild(opcoesCell);




           }
          
    
    
    
        });

      
      
      
    })
    .catch(error => {
      console.error("Erro ao obter os Turmas:", error);
  });

}

function editarAula() {

  let aulaEdit;
  aulaEdit = JSON.parse(sessionStorage.getItem('SelectedAulaEditinObject'));
    

  const formElement = document.getElementById('admin-form');
  const elements = formElement.elements;
  var dataAula = document.getElementById("dataAula").value;
  var descricaoAula = document.getElementById("descriçãoAula").value;
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  // Crio um objeto para armazenar os valores dos checkboxes selecionados
  const selectedCheckboxes = {};

  // Loop pelos checkboxes e adiciono os valores dos checkboxes selecionados ao objeto
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedCheckboxes[checkbox.id] = checkbox.value;
    }
  });

  storedTurmainObject = sessionStorage.getItem('TurmainObject');
  const turma = JSON.parse(storedTurmainObject);

  var Aula = {
      idTurma : turma.idTurma,
      dataAula : dataAula,
      descricaoAula : descricaoAula,
      frequencia : selectedCheckboxes
  };


  
  fetch(`http://localhost:5500/aula/${aulaEdit.idAula}`, {
      method: "PUT",
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(Aula)
  })
  .then(response => {
      if (!response.ok) {
      throw new Error('Erro na resposta do servidor');
      }
      return response.json();
  })
  .then(data=> {
      


      // Cria uma div de mensagem de sucesso
      var successMessageDiv = document.createElement("div");
      successMessageDiv.innerHTML = "Aula Editada com sucesso!";
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
      console.error(error);
  });

  return false;

}



function excluirAula(aula) {


    fetch(`http://localhost:5500/aula/${aula.idAula}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(aula)
    })
      .then(response => {
        
          console.log('Aula excluída com sucesso');
          
          HistoricoDeAulasPorTurma();
        
      })
      .catch(error => {
        console.error('Erro ao excluir a Turma:', error);
      });

      
}













function excluirMatricula(matricula) {


  let addedAlunos = [];
  addedAlunos = JSON.parse(sessionStorage.getItem('SelectedsAlunosinObject'));

    var matricula = {
      idAluno : matricula.idAluno,
      idTurma : matricula.idTurma
    }



    fetch(`http://localhost:5500/matriculas`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(matricula)
    })
      .then(response => {
        if (response.ok) {
          console.log('Matricula excluída com sucesso');
          addedAlunos = addedAlunos.filter(id => id !== matricula.idAluno);
          sessionStorage.setItem('SelectedsAlunosinObject', JSON.stringify(addedAlunos));
          AtualizarTabelaTurmas();
        } else {
          console.error('Erro ao excluir a Turma');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir a Turma:', error);
      });

      
}

