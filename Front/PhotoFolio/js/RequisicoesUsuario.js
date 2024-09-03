

function enviarFormulario() {
  
  var login = document.getElementById("login").value;
  var senha = document.getElementById("senha").value;

  var user = {
      login: login,
      senha: senha,
  };
  console.log('cheguei ate as requisições');

  fetch('http://localhost:5500/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor');
    }
    return response.json();
  })
  .then(data=> {
    if (data.isLoggedIn) {
      // Redirect to the desired URL
      console.log('teste')
      window.location.href = data.newUrl;
    }
  })
  .catch(error => {
    // Handle the rejected value
    console.error('Erro ao enviar requisição', error);
  });

  return false;

}


function enviarFormularioCurso() {
  var nomeDoCurso = document.getElementById("courseName").value;
  var statusDoCurso = document.getElementById("courseStatus").value;
  
  var curso = {
    nomeDoCurso: nomeDoCurso,
    statusDoCurso: statusDoCurso
  };

  
  fetch('http://localhost:5500/cursos', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(curso)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor');
    }
    return response.json();
  })
  .then(data=> {
    if (data.isSave) {
      // Redirect to the desired URL
      if (document.getElementById('modal') !== null){
        document.getElementById('modal').style.display = 'none';
        
      }

      if(document.getElementById('tabelaCursos') !== null){
        AtualizarTabelaCursos();
      }
      
    }
  })
 .catch(error => {
    console.error(error);
  });

  return false;

}




function AtualizarTabelaCursos(){
  

  fetch("http://localhost:5500/cursos")

    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }
      return response.json();
    })
    .then(data => {
      
       const corpoTabelaCursos = document.getElementById("corpoTabelaCursos");
       const modalEditar = document.getElementById('modal-edit');
       const salvarBtn = document.getElementById('btnSalvar');
       let selectedCourseId = null;

       corpoTabelaCursos.innerHTML = '';
  
      data.forEach(cursos => {
        const row = document.createElement("tr");
  
  
        const idCell = document.createElement("td");
        idCell.textContent = cursos.idCurso;
        row.appendChild(idCell);
  
        const nomeCursoCell = document.createElement("td");
        nomeCursoCell.textContent = cursos.nome;
        row.appendChild(nomeCursoCell);
  
        const statusCell = document.createElement("td");
        statusCell.textContent = cursos.status;
        row.appendChild(statusCell);
  
        corpoTabelaCursos.appendChild(row);
  
  
        const opcoesCell = document.createElement("td");

        const editarButton = document.createElement("button");
        editarButton.textContent = "";
          editarButton.className = "btn-lapis";
          const buttonUrl = getComputedStyle(editarButton).backgroundImage;
          const imageUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-editar-24.png';

          editarButton.style.backgroundImage = `url('${imageUrl}')`;
        opcoesCell.appendChild(editarButton);

        editarButton.addEventListener("click", function() {
          modalEditar.style.display = 'block';
          selectedCourseId = cursos.idCurso;//Armazeno em uma variavel pra que não sobrecreva no loop
        });


        salvarBtn.addEventListener('click', () => {
          if (selectedCourseId !== null) { // valido se o curso foi selecionado
            editarCurso(selectedCourseId); // chamo editar curso para o id selecionado
            modalEditar.style.display = 'none'; // fecho a modal
            selectedCourseId = null; // Reset a variavel local do curso selecionado.
          }
        });
  
  
        const excluirButton = document.createElement("button");
        excluirButton.textContent = "";
          excluirButton.className = "btn-lixo";
          const imagelixoUrl = buttonUrl + '/back/imagens/iconesDoSistema/icons8-trash-can-24.png';

          excluirButton.style.backgroundImage = `url('${imagelixoUrl}')`;
  
        opcoesCell.appendChild(excluirButton);
  
        excluirButton.addEventListener("click", function() {
          excluircurso(cursos.idCurso);
          
        });
  
        

        


  
        row.appendChild(opcoesCell);
  
  
  
      });
    })
    .catch(error => {
      console.error("Erro ao obter os cursos:", error);
  });

}

function excluircurso(idCurso) {
    fetch(`http://localhost:5500/cursos/${idCurso}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('curso excluído com sucesso');
          AtualizarTabelaCursos();
        } else {
          console.error('Erro ao excluir o curso');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir o curso:', error);
      });

      
}

function editarCurso(idCurso) {
  var nomeDoCurso = document.getElementById("courseNameedit").value;
  var statusDoCurso = document.getElementById("courseStatusedit").value;
        
  var curso = {
    id: idCurso,
    nome: nomeDoCurso,
    status: statusDoCurso
  };

  fetch(`http://localhost:5500/cursos/${idCurso}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(curso)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro ao editar o curso');
      }
    })
    .then(data => {
      console.log('Curso editado com sucesso:', data);
      AtualizarTabelaCursos(); // Call the function to update the table
    })
    .catch(error => {
      console.error('Erro ao editar o curso:', error);
    });

    
}




function SelectCursos(modalSelectDeExibicaoCursos){

  fetch("http://localhost:5500/cursos")

    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }
      return response.json();
    })
    .then(data => {
      
      const selectCursos = document.getElementById(modalSelectDeExibicaoCursos);
      

      // Limpa o select antes de adicionar as opções
      selectCursos.innerHTML = '';

      data.forEach(cursos => {
        
        const option = document.createElement('option');
        option.value = cursos.idCurso;
        option.text = cursos.nome;

        if(cursos.status == 'Ativo'){
          selectCursos.appendChild(option);
        }

  
      });
    })
    .catch(error => {
      console.error("Erro ao obter os cursos:", error);
  });

}

function SelectAdmin(SelectDeExibicaoAdm){

  fetch("http://localhost:5500/Administrador")

    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta do servidor');
      }
      return response.json();
    })
    .then(data => {
      
      const selectAdmin = document.getElementById(SelectDeExibicaoAdm);
      

      // Limpa o select antes de adicionar as opções
      selectAdmin.innerHTML = '';

      data.forEach(Adm => {
        
        const option = document.createElement('option');
        option.value = Adm.idAdministrador;
        option.text = Adm.nomeAD;

        selectAdmin.appendChild(option);
  
      });
    })
    .catch(error => {
      console.error("Erro ao obter os Administradores:", error);
  });

}







