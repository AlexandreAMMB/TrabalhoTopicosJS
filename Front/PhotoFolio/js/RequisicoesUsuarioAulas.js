

function inserirAula() {
    
    const formElement = document.getElementById('admin-form');
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
        if (data.isSave) {
        // // Redireciona para a função desejada
        // const aulas = document.getElementsByClassName('aula');
        // for (let i = 0; i < aulas.length; i++) {
        //   aulas[i].style.display = 'none';
        // }
        // document.getElementById('salvarAdm').style.display = 'none';


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

        
        
        }
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

