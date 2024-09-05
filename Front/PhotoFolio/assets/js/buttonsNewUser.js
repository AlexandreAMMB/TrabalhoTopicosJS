document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('admin-btn');
    
    const userBtn = document.getElementById('user-btn');
  

    adminBtn.addEventListener('click', () => {
        window.location.href = '../../../../Front/PhotoFolio/CadastroUsuario.html?tipo=admin';
    });

    

    userBtn.addEventListener('click', () => {
        window.location.href = '../../../../Front/PhotoFolio/CadastroUsuario.html?tipo=user';
    });



});
