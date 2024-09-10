

document.addEventListener('DOMContentLoaded', () => {
  


  document.getElementById('Open-modal-Turma').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

    // show the modal
    document.getElementById('modalTurma').style.display = 'flex';
    SelectCursos('Select-Curso');

    
  });

 

  document.getElementById('Close-modal-Turma').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

    // show the modal
    document.getElementById('modalTurma').style.display = 'none';

  
  });

  document.getElementById('Close-modal-Turma-Edit').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

    // show the modal
    document.getElementById('modalTurmaEdit').style.display = 'none';

  
  });


  document.getElementById('Open-modal-Turma-edit').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

    // show the modal
    document.getElementById('modalTurmaEdit').style.display = 'flex';
    // SelectCursos('Select-Curso');

    
  });
  
 

  
  
  

});


