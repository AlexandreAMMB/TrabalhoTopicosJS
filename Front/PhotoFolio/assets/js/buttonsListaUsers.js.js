document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('admin-btn-lista');
    const userBtn = document.getElementById('user-btn-lista');
  
    adminBtn.addEventListener('click', () => {
      showTable('admin');
    });
  
  
    userBtn.addEventListener('click', () => {
      AtualizarTabelaAlunos;
      showTable('user');
      
    });
  });