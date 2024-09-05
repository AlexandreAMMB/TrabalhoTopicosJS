

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('Open-modal').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

    // show the modal
    document.getElementById('modal').style.display = 'flex';

    
  });


  

  document.getElementById('Close-modal').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

    // show the modal
    document.getElementById('modal').style.display = 'none';

    
  });

  document.getElementById('Close-modal-edit').addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default link behavior

    // show the modal
    document.getElementById('modal-edit').style.display = 'none';

    
  });

 
  


  





  

});


