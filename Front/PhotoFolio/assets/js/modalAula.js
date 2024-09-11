var addedAlunos;

document.addEventListener('DOMContentLoaded', () => {
  let aulaEdit;
  aulaEdit = JSON.parse(sessionStorage.getItem('SelectedAulaEditinObject'));

 
  document.getElementById('histórico-de-aulas').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

  
    document.getElementById('voltar').style.display = 'block';
    // // Show the historicoAula-form
    document.getElementById('historicoAula-form').style.display = 'block';

    document.getElementById('admin-form').style.display = 'none';




   
   
    HistoricoDeAulasPorTurma();
    

    
  });

 

  

  document.getElementById('lancar-aulas').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

   
    sessionStorage.removeItem('SelectedAulaEditinObject'); //Garante que não vai ser exibidos dados de uma aula no form de criação.
    const formElement = document.getElementById('admin-form');
    formElement.reset();




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


    document.getElementById('editarAula').style.display = 'none';
    document.getElementById('salvarAdm').style.display = 'flex';
    document.getElementById('salvarAdm').style.marginLeft = '42%';
    document.getElementById('admin-form').style.backgroundColor = 'gray';

    

    
  });

  const editarAulaButton = document.getElementById('editarAula');

    editarAulaButton.addEventListener('click', function() {
      editarAula(); // Call the editarAula function when the button is clicked
    });

  




  


  

 
  




});


