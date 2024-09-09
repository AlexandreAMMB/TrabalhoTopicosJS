let storedTurmainObject; //Declarando o stored no contexto global para que a página de cadastro saiba diferenciar salvar edição ou salvar novo usuário


document.addEventListener('DOMContentLoaded', () => {
    // const tipo = new URLSearchParams(window.location.search).get('tipo');
    const aulas = document.getElementsByClassName('aula');
    for (let i = 0; i < aulas.length; i++) {
      aulas[i].style.display = 'none';
    }
    document.getElementById('salvarAdm').style.display = 'none';
   
    
    storedTurmainObject = sessionStorage.getItem('TurmainObject');

    if (storedTurmainObject) {
        const turma = JSON.parse(storedTurmainObject);
        

            fetch(`http://localhost:5500/cursos`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
                })
                .then(data => {
                    data.forEach(curso => {
                        if(turma.idCurso == curso.idCurso){
                            
                            document.getElementById('TituloGerenciarEspecifica').textContent = curso.nome + ' - ' + turma.HoraAulas;
                            
                        }
                        
                    });
                    
                    
                
                })
                .catch(error => {
                    console.log(error);
                });


      

    }



});




