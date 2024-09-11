

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

