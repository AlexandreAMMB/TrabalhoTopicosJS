document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('admin-btn-lista');
    const userBtn = document.getElementById('user-btn-lista');
  
    adminBtn.addEventListener('click', () => {
      console.log('Clicou no botão de administradores');
      showTable('admin');
    });
  
  
    userBtn.addEventListener('click', () => {
      console.log('Clicou no botão de alunos');
      showTable('user');
    });
  });