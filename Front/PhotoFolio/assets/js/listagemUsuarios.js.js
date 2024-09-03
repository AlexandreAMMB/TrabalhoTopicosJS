function showTable(tipo) {
    console.log(`Exibindo tabela de ${tipo}`);
    const adminlist = document.getElementById('tabelaAdministradores');
    const gestorlist = document.getElementById('tabelaGerentes');
    const userlist = document.getElementById('tabelaAlunos');
  
    if (tipo === 'admin') {
      adminlist.style.display = 'block';
      gestorlist.style.display = 'none';
      userlist.style.display = 'none';
    } else if (tipo === 'gestor') {
      adminlist.style.display = 'none';
      gestorlist.style.display = 'block';
      userlist.style.display = 'none';
      SelectAdmin('Select-Admin');
    } else if (tipo === 'user') {
      adminlist.style.display = 'none';
      gestorlist.style.display = 'none';
      userlist.style.display = 'block';
    }
  }