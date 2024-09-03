document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('admin-btn-lista');
    const gestorBtn = document.getElementById('gestor-btn-lista');
    const userBtn = document.getElementById('user-btn-lista');
  
    adminBtn.addEventListener('click', () => {
      console.log('Clicou no botão de administradores');
      showTable('admin');
    });
  
    gestorBtn.addEventListener('click', () => {
      console.log('Clicou no botão de gerentes');
      showTable('gestor');
    });
  
    userBtn.addEventListener('click', () => {
      console.log('Clicou no botão de alunos');
      showTable('user');
    });
  });