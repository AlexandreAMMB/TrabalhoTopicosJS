let storedAdminObject; //Declarando o stored no contexto global para que a página de cadastro saiba diferenciar salvar edição ou salvar novo usuário

document.addEventListener('DOMContentLoaded', () => {
    const tipo = new URLSearchParams(window.location.search).get('tipo');
    const adminForm = document.getElementById('admin-form');
    const userForm = document.getElementById('user-form');
    storedAdminObject = sessionStorage.getItem('adminObject');

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
    }

    



});




