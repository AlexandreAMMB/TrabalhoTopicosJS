

function enviarFormularioTurma() {
    
    var horarioDaTurma = document.getElementById("turmaHorario").value;
    var diasDeAulaDaTurma = document.getElementById("DiasDeAula").value;
    var cursoDaTurma = document.getElementById("Select-Curso").value;
    
    var Turma = {
        horarioDaTurma : horarioDaTurma,
        diasDeAulaDaTurma : diasDeAulaDaTurma ,
        cursoDaTurma: cursoDaTurma
    };

    
    fetch('http://localhost:5500/Turmas', {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(Turma)
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
        }
        return response.json();
    })
    .then(data=> {
        if (data.isSave) {
        // Redireciona para a função desejada
        document.getElementById('modalTurma').style.display = 'none';
        AtualizarTabelaTurmas();
        
        }
    })
    .catch(error => {
        console.error(error);
    });

    return false;

}




function AtualizarTabelaTurmas(){

  fetch("http://localhost:5500/Turmas")

    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }
      return response.json();
    })
    .then(data => {
      
       const corpoTabelaTurmas = document.getElementById("corpoTabelaTurmas");
       const modalEditar = document.getElementById('modalTurmaEdit');
       const salvarBtn = document.getElementById('btnEditarTurma');
       let selectedTurmaId = null;

       corpoTabelaTurmas.innerHTML = '';
  
      data.forEach(Turmas => {
        const row = document.createElement("tr");
  
  
        const idCell = document.createElement("td");


        fetch("http://localhost:5500/cursos")
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro na resposta do servidor');
          }
          return response.json();
        })
        .then(data => {
    
      
          data.forEach(cursos => {
           
            if(cursos.idCurso == Turmas.idCurso){
                idCell.textContent = cursos.nome;
            }
      
          });
        })
        .catch(error => {
          console.error("Erro ao obter os cursos:", error);
      });
    
        
        row.appendChild(idCell);
  
        const horarioTurmaCell = document.createElement("td");
        horarioTurmaCell.textContent = Turmas.HoraAulas;
        row.appendChild(horarioTurmaCell);
  
        const diasDeAulaCell = document.createElement("td");
        diasDeAulaCell.textContent = Turmas.diasAulas;
        row.appendChild(diasDeAulaCell);
  
        corpoTabelaTurmas.appendChild(row);
  
  
        const opcoesCell = document.createElement("td");

        const gerenciarButton = document.createElement("button");
        gerenciarButton.textContent = "";
        gerenciarButton.className = "btn-lapis";
          const buttonGerenciarUrl = getComputedStyle(gerenciarButton).backgroundImage;
          const imageGerenciarUrl = buttonGerenciarUrl + '/back/imagens/iconesDoSistema/icons8-configurações-24.png';

          gerenciarButton.style.backgroundImage = `url('${imageGerenciarUrl}')`;
        opcoesCell.appendChild(gerenciarButton);

        gerenciarButton.addEventListener("click", function() {
          sessionStorage.setItem('TurmainObject', JSON.stringify(Turmas)); //armazeno objeto na session para que seja acessado pelo form de edição
          window.location.href = '../../../../Front/PhotoFolio/GerenciarTurmaEspecifica.html';
          selectedTurmaId = Turmas.idTurma;//Armazeno em uma variavel pra que não sobrecreva no loop
        });

        salvarBtn.addEventListener('click', () => {
          if (selectedTurmaId !== null) { // valido se a turma foi selecionado
            editarTurma(selectedTurmaId); // chamo editar turma para o id selecionado
            modalEditar.style.display = 'none'; // fecho a modal
            selectedTurmaId = null; // Reset a variavel local do curso selecionado.
          }
        });

  
        const editarButton = document.createElement("button");
        editarButton.textContent = "";
          editarButton.className = "btn-lapis";
          const buttonUrl = getComputedStyle(editarButton).backgroundImage;
          const imageUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-editar-24.png';

          editarButton.style.backgroundImage = `url('${imageUrl}')`;
        opcoesCell.appendChild(editarButton);

        editarButton.addEventListener("click", function() {
            
            modalEditar.style.display = 'block';
            SelectCursos('Select-Curso-Edit');
            selectedTurmaId = Turmas.idTurma;//Armazeno em uma variavel pra que não sobrecreva no loop
        });

        salvarBtn.addEventListener('click', () => {
          if (selectedTurmaId !== null) { // valido se a turma foi selecionado
            editarTurma(selectedTurmaId); // chamo editar turma para o id selecionado
            modalEditar.style.display = 'none'; // fecho a modal
            selectedTurmaId = null; // Reset a variavel local do curso selecionado.
          }
        });

        const excluirButton = document.createElement("button");
        excluirButton.textContent = "";
        excluirButton.className = "btn-lixo";
        const imagelixoUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-trash-can-24.png';

        excluirButton.style.backgroundImage = `url('${imagelixoUrl}')`;
  
        opcoesCell.appendChild(excluirButton);
  
        excluirButton.addEventListener("click", function() {
          excluirTurma(Turmas.idTurma);
          
        });

        opcoesCell.style.alignContent = 'center';
  
        row.appendChild(opcoesCell);
  
  
  
      });
    })
    .catch(error => {
      console.error("Erro ao obter os Turmas:", error);
  });

}

function excluirTurma(idTurma) {
    fetch(`http://localhost:5500/Turmas/${idTurma}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Turma excluída com sucesso');
          AtualizarTabelaTurmas();
        } else {
          console.error('Erro ao excluir a Turma');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir a Turma:', error);
      });

      
}

function editarTurma(idTurma) {
    var horarioDaTurma = document.getElementById("turmaHorario-Edit").value;
    var diasDeAulaDaTurma = document.getElementById("DiasDeAula-Edit").value;
    var cursoDaTurma = document.getElementById("Select-Curso-Edit").value;
    

        
    var Turma = {
        horarioDaTurma : horarioDaTurma,
        diasDeAulaDaTurma : diasDeAulaDaTurma ,
        cursoDaTurma: cursoDaTurma
    };

 
    
  fetch(`http://localhost:5500/Turmas/${idTurma}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Turma)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro ao editar o curso');
      }
    })
    .then(data => {
      console.log('Turma editada com sucesso:', data);
      document.getElementById('modalTurmaEdit').style.display = 'none';
      AtualizarTabelaTurmas(); // Call the function to update the table
    })
    .catch(error => {
      console.error('Erro ao editar Turma:', error);
    });

    
}


function SelectTurma(selectDeTurmas){

  

  fetch("http://localhost:5500/Turmas")

    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }
      return response.json();
    })
    .then(async data => {
      
      const selectCadastroAlunoTurma = document.getElementById(selectDeTurmas);
      


      for (const turmas of data) {
        const cursosResponse = await fetch("http://localhost:5500/cursos");
        const cursosData = await cursosResponse.json();
  
        let optionText = turmas.idCurso;
        let optionValue = turmas.idTurma;
        for (const cursos of cursosData) {
          if (turmas.idCurso === cursos.idCurso) {
            optionText = cursos.nome;
          }
        }
  
        const option = document.createElement('option');
        option.value = optionValue;
        option.text = optionText;
        selectCadastroAlunoTurma.appendChild(option);
      }

        
  
    })
    .catch(error => {
      console.error("Erro ao obter os cursos:", error);
  });

}

