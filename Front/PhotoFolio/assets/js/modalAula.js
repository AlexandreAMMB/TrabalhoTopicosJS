

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('lancar-aulas').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

    const aulas = document.getElementsByClassName('aula');
    for (let i = 0; i < aulas.length; i++) {
      aulas[i].style.display = 'block';
    }

    const opcoes = document.getElementsByClassName('frequencia');
    for (let i = 0; i < opcoes.length; i++) {
      opcoes[i].style.display = 'flex';
    }
    
    document.getElementById('salvarAdm').style.display = 'flex';
    document.getElementById('salvarAdm').style.marginLeft = '45%';
    document.getElementById('admin-form').style.backgroundColor = 'gray';

    
  });
  

  document.getElementById('Close-modal').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

    // show the modal
    document.getElementById('modal-Aula').style.display = 'none';

    
  });


});


