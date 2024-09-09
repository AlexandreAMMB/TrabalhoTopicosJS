function showTable(tipo) {
    // console.log(`Exibindo tabela de ${tipo}`);
    const adminlist = document.getElementById('tabelaAdministradores');
    const userlist = document.getElementById('tabelaAlunos');
  
    if (tipo === 'admin') {
      adminlist.style.display = 'block';
      
      userlist.style.display = 'none';
    } else if (tipo === 'user') {
      adminlist.style.display = 'none';
      
      userlist.style.display = 'block';
    }
  }