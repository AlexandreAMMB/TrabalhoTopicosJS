var carrinho = [];
var exibir = 0;


function enviarFormulario() {
  const login = document.getElementById("login").value;
  const senha = document.getElementById("senha").value;

  const user = {
      login: login,
      senha: senha,
  };

  console.log(user.login);
  console.log(user.senha);

  fetch('http://localhost:5500/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na resposta do servidor');
    }
    return response.json();
  })
  .then(data=> {
    if (data.isLoggedIn) {
      // Redirect to the desired URL
      window.location.href = data.newUrl;
    }
  })
  .catch(error => {
    // Handle the rejected value
    console.error(error);
  });

  return false;
}

  //   var formData = new FormData();

  //  for (var key in usuario) {
  //    formData.append(key, usuario[key]); // Adiciona os outros campos do produto ao objeto FormData
  //  }

  // fetch("http://localhost:3003/login", {
  //   method: "POST",
  //   body: formData
  // })
  //   .then(response => {
  //     if (response.ok) {
  //       console.log("TesteRequisiçaõ");
  //       // A requisição foi bem-sucedida
  //       return response.json();
  //     } else {
  //       // A requisição falhou
  //       throw new Error("Erro na requisição.");
  //     }
  //   })
  //   .then(data => {
  //     // Lógica para manipular a resposta da requisição
  //   })
  //   .catch(error => {
  //     // Lógica para tratar erros
  //   });

    // AtualizarTabelaProdutos();

// }

// if(exibir == 0){
//     AtualizarTabelaProdutos();
//     exibir = 1;
// }




// function AtualizarTabelaProdutos(){

// fetch("http://localhost:3003/produtos")
//     .then(response => response.json())
//     .then(data => {
//        const corpoTabela = document.getElementById("corpoTabela");
//        corpoTabela.innerHTML = '';
  
//       data.forEach(produto => {
//         const row = document.createElement("tr");
  
//         const imagemCell = document.createElement("td");
//         imagemCell.classList.add("tabela-celula");
//         const imagem = document.createElement("img");
//         imagem.src = `../../../back/imagens/${produto.codigo}.png`;
//         imagem.classList.add("imagem-celula");
//         imagemCell.appendChild(imagem);
//         row.appendChild(imagemCell);
  
//         const codigoCell = document.createElement("td");
//         imagemCell.classList.add("tabela-celula");
//         codigoCell.textContent = produto.codigo;
//         row.appendChild(codigoCell);
  
//         const nomeCell = document.createElement("td");
//         imagemCell.classList.add("tabela-celula");
//         nomeCell.textContent = produto.nome;
//         row.appendChild(nomeCell);
  
//         const descricaoCell = document.createElement("td");
//         imagemCell.classList.add("tabela-celula");
//         descricaoCell.textContent = produto.descricao;
//         row.appendChild(descricaoCell);
  
//         const precoCell = document.createElement("td");
//         precoCell.textContent = produto.preco;
//         row.appendChild(precoCell);
  
//         corpoTabela.appendChild(row);
  
  
//         const acoesCell = document.createElement("td");
  
//         const comprarButton = document.createElement("button");
//         comprarButton.textContent = "Comprar";
//         acoesCell.appendChild(comprarButton);
  
//         //Event listener para os botões
//         comprarButton.addEventListener("click", function() {
//           adicionarAoCarrinho(produto.codigo);
//           exibirProdutosCarrinho(1);

//           exibirTotal(1,produto.preco, 1);
//           console.log(carrinho);
//         });
  
        
  
  
//         const excluirButton = document.createElement("button");
//         excluirButton.textContent = "Excluir";
//         acoesCell.appendChild(excluirButton);
  
//         excluirButton.addEventListener("click", function() {
//           excluirDoCarrinho(produto.codigo);
//           excluirProduto(produto.codigo , 1);
//           exibirProdutosCarrinho(1);
//           exibirTotal(1,produto.preco, 6);
//           console.log(carrinho);
//         });
  
//         const editarButton = document.createElement("button");
//         editarButton.textContent = "Editar";
//         acoesCell.appendChild(editarButton);
  
//         row.appendChild(acoesCell);
  
  
  
  
//       });
//     })
//     .catch(error => {
//       console.error("Erro ao obter os produtos:", error);
//   });

// }


// // function AtualizarTabelaProdutos(){

// //     fetch("http://localhost:3003/produtos")
// //     .then(response => response.json())
// //     .then(data => {
// //       corpoTabela = document.getElementById("corpoTabela");
  
     
// //     })
// //     .catch(error => {
// //       console.error("Erro ao obter os produtos:", error);
// //   });

// // }




// function excluirProduto(codigo) {
//     fetch(`http://localhost:3003/produtos/${codigo}`, {
//       method: 'DELETE'
//     })
//       .then(response => {
//         if (response.ok) {
//           console.log('Produto excluído com sucesso');
//         } else {
//           console.error('Erro ao excluir o produto');
//         }
//       })
//       .catch(error => {
//         console.error('Erro ao excluir o produto:', error);
//       });

//       AtualizarTabelaProdutos();
// }




// function adicionarAoCarrinho(codigo) {
//     carrinho.push(codigo);
// }

// function excluirDoCarrinho(codigo, excluirtudo) {

//     const indice = carrinho.findIndex(item => item === codigo);
//     if (indice !== -1 || excluirtudo == 1) {
//       carrinho.splice(indice, 1); // Remove o código do carrinho
//       exibirProdutosCarrinho(); // Atualiza a exibição do carrinho
//     }
    
// }


// // Função para obter os detalhes de um produto pelo código
// function obterDetalhesProduto(codigo) {
//     return fetch(`http://localhost:3003/produtos/${codigo}`)
//     .then(response => response.json())
//     .catch(error => {
//         console.error(`Erro ao obter detalhes do produto ${codigo}:`, error);
//     });
// }

// var totalValor=0;
// var totalQuantidade=0;
// // Função para exibir os produtos do carrinho na modal
// function exibirProdutosCarrinho(exibir) {
//     const listaProdutos = document.getElementById("listaProdutos");
//     listaProdutos.innerHTML = ""; // Limpa a lista antes de preencher novamente
   
//     const codigosExibidos = {};

//     carrinho.forEach(codigo => {
//     obterDetalhesProduto(codigo)
//         .then(produto => {

//             if (!codigosExibidos[codigo]) {
//                 codigosExibidos[codigo] = true; 

//                 const quantidade = carrinho.reduce((count, codigo) => {
//                     if (codigo === produto.codigo) {
//                     return count + 1;
//                     }
//                     return count;
//                 }, 0);
                
//                 preco = parseFloat(produto.preco);
//                 total = preco*quantidade;
               

//                 const row = document.createElement("tr");
                
            
//                 const itemProduto = document.createElement("td");
//                 itemProduto.textContent = `${produto.nome}`;
//                 row.appendChild(itemProduto);

//                 const itemProdutoPreco = document.createElement("td");
//                 itemProdutoPreco.textContent = `R$ ${preco} `;
//                 row.appendChild(itemProdutoPreco);

//                 const itemProdutoquantidade = document.createElement("td");
//                 itemProdutoquantidade.textContent = quantidade;
//                 row.appendChild(itemProdutoquantidade);

//                 const itemProdutoTotal = document.createElement("td");
//                 itemProdutoTotal.textContent = `R$ ${total} `;
//                 row.appendChild(itemProdutoTotal);

//                 const acoesCell = document.createElement("td");
//                 const excluirButton = document.createElement("button");
//                 excluirButton.textContent = "Excluir";
//                 acoesCell.appendChild(excluirButton);
//                 row.appendChild(acoesCell);

                


//                 excluirButton.addEventListener("click", function() {
//                     excluirDoCarrinho(codigo , 0);
//                     exibirTotal(1,produto.preco, 0);
//                     console.log(carrinho);
//                 });


//                 listaProdutos.appendChild(row);
                
                



//             } else {
//                 const linhaExistente = document.querySelector(
//                     `#listaProdutos tr[data-codigo="${codigo}"]`
//                   );
//                   const itemProdutoQuantidade = linhaExistente.querySelector("td:nth-child(3)");
//                   const itemProdutoTotal = linhaExistente.querySelector("td:nth-child(4)");
          
//                   const quantidade = carrinho.reduce((count, c) => {
//                     if (c === codigo) {
//                       return count + 1;
//                     }
//                     return count;
//                   }, 0);
          
//                   const preco = parseFloat(produto.preco);
//                   const total = preco * quantidade;
          
//                   itemProdutoQuantidade.textContent = quantidade;
//                   itemProdutoTotal.textContent = `R$ ${total}`;
                  
                  
                


//             }

            
            



//         });

//     });


    

//     // Exibe a modal
//     if(exibir == 0){
//         const modalCarrinho = document.getElementById("modalCarrinho");
//         modalCarrinho.style.display = "block";
//     }

// }


//     ttCalc = 0;
//     ttquant = 0;
// function exibirTotal(totalQuantidade,totalValor, opcao){
//     const listaTotal = document.getElementById("Totais");
//     listaTotal.innerHTML = ""; // Limpa a lista antes de preencher novamente

//     if(opcao == 1){
//         ttCalc += parseFloat(totalValor);
//         ttquant += totalQuantidade;
//     }else if(opcao == 0){
//         ttCalc -= parseFloat(totalValor);
//         ttquant -= totalQuantidade;
//     }else{
//         ttCalc -= parseFloat(totalValor);
//         ttquant -= totalQuantidade;
//     }
    

//     const row = document.createElement("tr");

//     const item = document.createElement("td");
//     item .textContent = "----------";
//     row.appendChild(item );

//     const item2 = document.createElement("td");
//     item2.textContent = "----------";
//     row.appendChild(item2);

//     const item3 = document.createElement("td");
//     item3.textContent = "----------";
//     row.appendChild(item3);
                
            
//     const itemQuant = document.createElement("td");
//     itemQuant .textContent = `${ttquant}`;
//     row.appendChild(itemQuant );

//     const itemProdutoPreco = document.createElement("td");
//     itemProdutoPreco.textContent = `R$ ${ ttCalc}`;
//     row.appendChild(itemProdutoPreco);

//     listaTotal.appendChild(row);


// }



