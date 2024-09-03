document.addEventListener('DOMContentLoaded', () => {
    const tipo = new URLSearchParams(window.location.search).get('tipo');
    const adminForm = document.getElementById('admin-form');
    const gestorForm = document.getElementById('gestor-form');
    const userForm = document.getElementById('user-form');
    

    if (tipo === 'admin') {
        adminForm.style.display = 'block';
        gestorForm.style.display = 'none';
        userForm.style.display = 'none';
    } else if (tipo === 'gestor') {
        adminForm.style.display = 'none';
        gestorForm.style.display = 'block';
        userForm.style.display = 'none';
        SelectAdmin('Select-Admin');
    } else if (tipo === 'user') {
        adminForm.style.display = 'none';
        gestorForm.style.display = 'none';
        userForm.style.display = 'block';
    }


});
