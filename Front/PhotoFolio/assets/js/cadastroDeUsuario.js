let storedAdminObject; //Declarando o stored no contexto global para que a página de cadastro saiba diferenciar salvar edição ou salvar novo usuário
let storedAlunoinObject;

document.addEventListener('DOMContentLoaded', () => {
    const tipo = new URLSearchParams(window.location.search).get('tipo');
    const adminForm = document.getElementById('admin-form');
    const userForm = document.getElementById('user-form');
    storedAdminObject = sessionStorage.getItem('adminObject');
    storedAlunoinObject = sessionStorage.getItem('AlunoinObject');

    // Seleciona o checkbox e o div com os inputs
    const radio = document.querySelector('.chekGestor input[type="radio"]');
    const inputs = document.getElementById('inputs');
    let radioWasChecked = false; // variável para acompanhar o estado anterior do botão de opção
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');


    

    if (tipo === 'admin') {




        adminForm.style.display = 'block';
       
        userForm.style.display = 'none';

        // Adiciona um evento de clique ao radio button
        radio.addEventListener('click', () => {
            if (radio.checked && !radioWasChecked) {
                // Se o radio button estiver selecionado e não estava selecionado antes, exibe os inputs
                inputs.style.display = 'flex';
                input1.required = true;
                input2.required = true;

            } else {
                // Se o radio button não estiver selecionado ou estava selecionado antes, esconde os inputs
                inputs.style.display = 'none';
                input1.required = false;
                input2.required = false;
                radio.checked = !radioWasChecked;
            }
            radioWasChecked = radio.checked; // Update the variable with the current state
        });

        //preenche o edit com os dados do usuário selecionado
        if (storedAdminObject) {
            const Adm = JSON.parse(storedAdminObject);
            
            
            document.getElementById('titulopageCadastroDeUser').textContent = 'Edição de Usuário';
            document.getElementById('nomeAdm').value = Adm.nomeAD;
            document.getElementById('emailAdm').value = Adm.email;
            document.getElementById('telefoneAdm').value = Adm.telefone;

            if(Adm.idGestor != null){
                radio.checked = true;
                inputs.style.display = 'flex';
                input1.required = true;
                input2.required = true;
                

                fetch(`http://localhost:5500/gestor/${Adm.idGestor}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta do servidor');
                    }
                    return response.json();
                    })
                    .then(data => {
                        document.getElementById('input1').value = data[0].idGestor;
                        document.getElementById('input2').value = data[0].area;
                    })
                    .catch(error => {
                        console.log(error);
                    });


            }

            fetch(`http://localhost:5500/usuarios/${Adm.idUsuario}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
                })
                .then(data => {
                    data.forEach(user => {
                        if(user.idUsuario === Adm.idUsuario){
                            document.getElementById('loginAdm').value = user.login;
                            document.getElementById('senhaAdm').value = user.senha;
                            
                        }
                    });
                    
                })
                .catch(error => {
                    console.log(error);
                });

                document.getElementById('salvarAdm').textContent = 'Salvar';


            
            
            
        } 

        
        window.addEventListener('beforeunload', function() {
            sessionStorage.removeItem('adminObject');
          });



    } else if (tipo === 'user') {
        adminForm.style.display = 'none';
        
        userForm.style.display = 'block';
        
        
        
        const selectCadastroAlunoTurma = document.getElementById('Select-Turma');
        selectCadastroAlunoTurma.innerHTML = '';
        // Adiciona a opção de placeholder
        const placeholderOption = document.createElement('option');
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        placeholderOption.value = '';
        placeholderOption.text = 'Selecione a turma do aluno';
        selectCadastroAlunoTurma.appendChild(placeholderOption);
        
        


        if (storedAlunoinObject) {
            const Aluno = JSON.parse(storedAlunoinObject);
            
            
            document.getElementById('titulopageCadastroDeUser').textContent = 'Edição de Usuário';
            document.getElementById('nomeAluno').value = Aluno.nomeAl;
            document.getElementById('cpfAluno').value = Aluno.cpf;
            document.getElementById('idadeAluno').value = Aluno.idade;
            document.getElementById('telefoneAluno').value = Aluno.telefone;
            document.getElementById('emailAluno').value = Aluno.email;
            document.getElementById('enderecoAluno').value = Aluno.endereco;


            fetch("http://localhost:5500/Turmas")
            .then(response => {
                if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
                }
                return response.json();
            })
            .then(async data => {
                const selectElement = document.getElementById('Select-Turma');
                selectElement.innerHTML = ''; // Limpa o select antes de adicionar as opções

                for (const turma of data) {
                const option = document.createElement('option');
                option.value = turma.idTurma;
                option.text = turma.idCurso;

                for (const curso of await (await fetch("http://localhost:5500/cursos")).json()) {
                    if (turma.idCurso === curso.idCurso) {
                    option.text = curso.nome;
                    }
                }

                selectElement.appendChild(option);

                if (turma.idTurma === Aluno.idTurma) {
                    option.selected = true;
                }
                }
            })
            .catch(error => {
                console.error("Erro ao obter os cursos:", error);
            });


            fetch(`http://localhost:5500/responsavel/${Aluno.idResponsavel}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na resposta do servidor');
                    }
                    return response.json();
                    })
                    .then(data => {

                        const inputNomeResp = document.getElementById('nomeResponsavel');
                        const inputtelefoneResp = document.getElementById('telefoneResponsavel');
                        const inputEmailResp = document.getElementById('emailResponsavel');
                        const inputEnderecoResp = document.getElementById('enderecoResponsavel');

                        inputNomeResp.value = data[0].nomeResponsavel;
                        inputtelefoneResp.value = data[0].telefone;
                        inputEmailResp.value = data[0].email;
                        inputEnderecoResp.value = data[0].endereco;


                    })
                    .catch(error => {
                        console.log(error);
                    });
          


            fetch(`http://localhost:5500/usuarios/${Aluno.idUsuario}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na resposta do servidor');
                }
                return response.json();
                })
                .then(data => {
                    data.forEach(user => {
                        if(user.idUsuario === Aluno.idUsuario){
                            document.getElementById('loginAluno').value = user.login;
                            document.getElementById('senhaAluno').value = user.senha;
                            
                        }
                    });
                    
                })
                .catch(error => {
                    console.log(error);
                });

                document.getElementById('salvarAluno').textContent = 'Salvar';


            
            
            
        }else{
            SelectTurma('Select-Turma');
        } 

        
        window.addEventListener('beforeunload', function() {
            sessionStorage.removeItem('AlunoinObject');
          });

        
       



    }

    



});




