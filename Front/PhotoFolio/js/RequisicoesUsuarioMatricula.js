

function inserirMatricula() {
    
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


        // // Cria uma div de mensagem de sucesso
        // var successMessageDiv = document.createElement("div");
        // successMessageDiv.innerHTML = "Aula cadastrada com sucesso!";
        // successMessageDiv.style.color = "green";
        // successMessageDiv.style.fontSize = "18px";
        // successMessageDiv.style.padding = "10px";
        // successMessageDiv.style.border = "1px solid green";
        // successMessageDiv.style.borderRadius = "5px";
        // successMessageDiv.style.background = "lightgreen";
        // successMessageDiv.style.marginBottom = "1rem";

        // // Obtem o elemento do botão
        // var buttonElement = document.getElementById("salvarAdm");

        // // Insere a div da mensagem de sucesso antes do elemento do botão
        // buttonElement.parentNode.insertBefore(successMessageDiv, buttonElement);


        // // Adiciona um tempo limite para remover a mensagem de sucesso após alguns segundos
        // setTimeout(function() {
        //   successMessageDiv.remove();
        // }, 5000);

        // formElement.reset();

        
        
        }
    })
    .catch(error => {
        console.error(error);
    });

    return false;

}




// function AtualizarTabelaTurmas(){

//   fetch("http://localhost:5500/matriculas")

//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Erro na resposta do servidor');
//       }
//       return response.json();
//     })
//     .then(data => {
      

//       storedTurmainObject = sessionStorage.getItem('TurmainObject');
//       const turma = JSON.parse(storedTurmainObject);
      
//        const corpoTabelaTurmas = document.getElementById("corpoTabelaTurmas");
//       //  const modalEditar = document.getElementById('modalTurmaEdit');
//       //  const salvarBtn = document.getElementById('btnEditarTurma');
//        let selectedTurmaId = null;

//       corpoTabelaTurmas.innerHTML = '';
  
//       data.forEach(matricula => {
//         const row = document.createElement("tr");
  
  
//         const alunoCell = document.createElement("td");

//         if(matricula.idTurma == turma.idTurma){
//           console.log(matricula.idTurma);

//           fetch("http://localhost:5500/aluno")
//             .then(response => {
//               if (!response.ok) {
//                 throw new Error('Erro na resposta do servidor');
//               }
//               return response.json();
//             })
//             .then(data => {
        
          
//               data.forEach(aluno => {
              
//                 if(matricula.idAluno == aluno.idAluno ){

//                     alunoCell.textContent = aluno.nomeAl;
//                     alunoCell.style.width = "40%";
//                     row.appendChild(alunoCell);
      
//                     const faltasTurmaCell = document.createElement("td");
//                     faltasTurmaCell.textContent = 'faltas';
//                     row.appendChild(faltasTurmaCell);
              
//                     const ResultadoCell = document.createElement("td");
//                     ResultadoCell.textContent = 'resultado';
//                     row.appendChild(ResultadoCell);
              
//                     corpoTabelaTurmas.appendChild(row);
              
              
//                     const opcoesCell = document.createElement("td");

//                     const checkboxContainer = document.createElement("span"); // Criar um container para o checkbox e label

//                     const presencaCheck = document.createElement("input");
//                     presencaCheck.type = "checkbox";

//                     const label = document.createElement("label");
//                     label.textContent = "Presente";
//                     label.style.color = "white";
//                     label.style.fontSize = "16px";
//                     label.style.marginRight = "40%";
//                     presencaCheck.id = aluno.idAluno;
//                     presencaCheck.value = aluno.idAluno;
//                     label.htmlFor = presencaCheck.id;
//                     presencaCheck.style.width = "1rem";
//                     presencaCheck.style.height = "1rem";
//                     presencaCheck.style.marginTop= "0.2rem";
//                     presencaCheck.style.paddingRight= "0%";
//                     label.style.marginLeft = "-18%";
//                     presencaCheck.style.alignContent = "right";
//                     opcoesCell.style.display = "none";
                    
//                    opcoesCell.className = "frequencia";
                    
//                     opcoesCell.appendChild(presencaCheck); // Adicionar o checkbox ao container
//                     opcoesCell.appendChild(label); // Adicionar o label ao container

                    
//                     opcoesCell.style.alignContent = 'center';
                   

//                     row.appendChild(opcoesCell);


//                 }
          
//               });
//             })
//             .catch(error => {
//               console.error("Erro ao obter os cursos:", error);
//           });
        
            
           



//         }
        
  
  
  
//       });
//     })
//     .catch(error => {
//       console.error("Erro ao obter os Turmas:", error);
//   });

// }

// function excluirTurma(idTurma) {
//     fetch(`http://localhost:5500/Turmas/${idTurma}`, {
//       method: 'DELETE'
//     })
//       .then(response => {
//         if (response.ok) {
//           console.log('Turma excluída com sucesso');
//           AtualizarTabelaTurmas();
//         } else {
//           console.error('Erro ao excluir a Turma');
//         }
//       })
//       .catch(error => {
//         console.error('Erro ao excluir a Turma:', error);
//       });

      
// }

// function editarTurma(idTurma) {
//     var horarioDaTurma = document.getElementById("turmaHorario-Edit").value;
//     var diasDeAulaDaTurma = document.getElementById("DiasDeAula-Edit").value;
//     var cursoDaTurma = document.getElementById("Select-Curso-Edit").value;
    

        
//     var Turma = {
//         horarioDaTurma : horarioDaTurma,
//         diasDeAulaDaTurma : diasDeAulaDaTurma ,
//         cursoDaTurma: cursoDaTurma
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
//         throw new Error('Erro ao editar o curso');
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


// function SelectTurma(selectDeTurmas){

  

//   fetch("http://localhost:5500/Turmas")

//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Erro na resposta do servidor');
//       }
//       return response.json();
//     })
//     .then(async data => {
      
//       const selectCadastroAlunoTurma = document.getElementById(selectDeTurmas);
      


//       for (const turmas of data) {
//         const cursosResponse = await fetch("http://localhost:5500/cursos");
//         const cursosData = await cursosResponse.json();
  
//         let optionText = turmas.idCurso;
//         let optionValue = turmas.idTurma;
//         for (const cursos of cursosData) {
//           if (turmas.idCurso === cursos.idCurso) {
//             optionText = cursos.nome;
//           }
//         }
  
//         const option = document.createElement('option');
//         option.value = optionValue;
//         option.text = optionText;
//         selectCadastroAlunoTurma.appendChild(option);
//       }

        
  
//     })
//     .catch(error => {
//       console.error("Erro ao obter os cursos:", error);
//   });

// }

