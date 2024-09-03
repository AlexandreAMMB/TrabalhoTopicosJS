document.addEventListener('DOMContentLoaded', () => {
    const adminBtn = document.getElementById('admin-btn');
    const gestorBtn = document.getElementById('gestor-btn');
    const userBtn = document.getElementById('user-btn');
  

    adminBtn.addEventListener('click', () => {
        window.location.href = '../../../../Front/PhotoFolio/CadastroUsuario.html?tipo=admin';
    });

    gestorBtn.addEventListener('click', () => {
        window.location.href = '../../../../Front/PhotoFolio/CadastroUsuario.html?tipo=gestor'; 
    });

    userBtn.addEventListener('click', () => {
        window.location.href = '../../../../Front/PhotoFolio/CadastroUsuario.html?tipo=user';
    });



});
