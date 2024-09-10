

function inserirMatricula() {
    let addedAlunos = [];
    addedAlunos = JSON.parse(sessionStorage.getItem('SelectedsAlunosinObject'));

    var idAluno = document.getElementById("Select-Aluno").value;
    
    storedTurmainObject = sessionStorage.getItem('TurmainObject');
    const turma = JSON.parse(storedTurmainObject);

    var matricula = {
        idTurma : turma.idTurma,
        idAluno : idAluno
    };

    console.log(matricula);

    
    fetch('http://localhost:5500/matriculas', {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(matricula)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
        }
        return response.json();
    })
    .then(data=> {
        if (data.isSave) {
        
          document.getElementById('modalMatricula').style.display = 'none';
          addedAlunos.push(matricula.idAluno);
          sessionStorage.setItem('SelectedsAlunosinObject', JSON.stringify(addedAlunos)); // update session storage
          AtualizarTabelaTurmas();
        
        
        }
    })
    .catch(error => {
        console.error(error);
    });

    return false;

}






function SelectAlunos(){

  let addedAlunos = [];
  addedAlunos = JSON.parse(sessionStorage.getItem('SelectedsAlunosinObject'));
  
  storedTurmainObject = sessionStorage.getItem('TurmainObject');
  const turma = JSON.parse(storedTurmainObject);
  const selectAluno = document.getElementById('Select-Aluno');
  

  // Limpa o select antes de adicionar as opções
  selectAluno.innerHTML = '';
  const option = document.createElement('option');
  option.text = 'Selecione um aluno';

  option.disabled = true;
  option.selected = true;
  selectAluno.appendChild(option);

          fetch("http://localhost:5500/aluno")
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
              }
              return response.json();
            })
            .then(data => {
        
              data.forEach(aluno => {

                fetch("http://localhost:5500/matriculas")
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                  }
                  return response.json();
                })
                .then(data => {
                  
              
                  data.forEach(matricula => {
                   
                    

                      if(matricula.idAluno == aluno.idAluno && matricula.idTurma != turma.idTurma){
                        if (!addedAlunos.includes(aluno.idAluno)) { // check if ID is in the array
                          const option = document.createElement('option');
                          option.value = aluno.idAluno;
                          option.text = aluno.nomeAl;
                          selectAluno.appendChild(option);
                          addedAlunos.push(aluno.idAluno);
                          
                        } else if(matricula.idAluno == aluno.idAluno && matricula.idTurma == turma.idTurma){
                          addedAlunos.push(aluno.idAluno);
                          sessionStorage.setItem('SelectedsAlunosinObject', JSON.stringify(addedAlunos));
                        }

                      }
                  })
                  .catch(error => {
                    console.error("Erro ao obter os alunos:", error);
                  });

                  
          
              });
            })
            .catch(error => {
              console.error("Erro ao obter os cursos:", error);
            });
        
          });
  
      

}

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

