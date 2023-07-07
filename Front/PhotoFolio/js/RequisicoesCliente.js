var carrinho = [];
var exibir = 0;


function enviarFormulario() {

    var codigo = document.getElementById("codigo").value;
    var nome = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var preco = document.getElementById("preco").value;
    var imagem = document.getElementById("imagem");

    var produto = {
        codigo: codigo,
        nome: nome,
        descricao: descricao,
        preco: preco,
    };

    var formData = new FormData();
   formData.append("imagem", imagem.files[0]); // Adiciona a imagem ao objeto FormData

    console.log(imagem.files[0]);

   for (var key in produto) {
     formData.append(key, produto[key]); // Adiciona os outros campos do produto ao objeto FormData
   }

  fetch("http://localhost:3003/produtos", {
    method: "POST",
    body: formData
  })
    .then(response => {
      if (response.ok) {
        // A requisição foi bem-sucedida
        return response.json();
      } else {
        // A requisição falhou
        throw new Error("Erro na requisição.");
      }
    })
    .then(data => {
      // Lógica para manipular a resposta da requisição
    })
    .catch(error => {
      // Lógica para tratar erros
    });

    AtualizarTabelaProdutos();

}

if(exibir == 0){
    AtualizarTabelaProdutos();
    exibir = 1;
}




function AtualizarTabelaProdutos(){

fetch("http://localhost:3003/produtos")
    .then(response => response.json())
    .then(data => {
       const corpoTabela = document.getElementById("corpoTabela");
       corpoTabela.innerHTML = '';
  
      data.forEach(produto => {
        const row = document.createElement("tr");
  
        const imagemCell = document.createElement("td");
        const imagem = document.createElement("img");
        imagem.src = `../../../back/imagens/789.png`;
        imagemCell.appendChild(imagem);
        row.appendChild(imagemCell);
  
        const codigoCell = document.createElement("td");
        codigoCell.textContent = produto.codigo;
        row.appendChild(codigoCell);
  
        const nomeCell = document.createElement("td");
        nomeCell.textContent = produto.nome;
        row.appendChild(nomeCell);
  
        const descricaoCell = document.createElement("td");
        descricaoCell.textContent = produto.descricao;
        row.appendChild(descricaoCell);
  
        const precoCell = document.createElement("td");
        precoCell.textContent = produto.preco;
        row.appendChild(precoCell);
  
        corpoTabela.appendChild(row);
  
  
        const acoesCell = document.createElement("td");
  
        const comprarButton = document.createElement("button");
        comprarButton.textContent = "Comprar";
        acoesCell.appendChild(comprarButton);
  
        //Event listener para os botões
        comprarButton.addEventListener("click", function() {
          adicionarAoCarrinho(produto.codigo);
          exibirProdutosCarrinho(1);
          console.log(carrinho);
        });
  
        
  
  
        const excluirButton = document.createElement("button");
        excluirButton.textContent = "Excluir";
        acoesCell.appendChild(excluirButton);
  
        excluirButton.addEventListener("click", function() {
          excluirDoCarrinho(produto.codigo);
          excluirProduto(produto.codigo , 1);
          exibirProdutosCarrinho(1);
          console.log(carrinho);
        });
  
        const editarButton = document.createElement("button");
        editarButton.textContent = "Editar";
        acoesCell.appendChild(editarButton);
  
        row.appendChild(acoesCell);
  
  
  
  
      });
    })
    .catch(error => {
      console.error("Erro ao obter os produtos:", error);
  });

}


// function AtualizarTabelaProdutos(){

//     fetch("http://localhost:3003/produtos")
//     .then(response => response.json())
//     .then(data => {
//       corpoTabela = document.getElementById("corpoTabela");
  
     
//     })
//     .catch(error => {
//       console.error("Erro ao obter os produtos:", error);
//   });

// }




function excluirProduto(codigo) {
    fetch(`http://localhost:3003/produtos/${codigo}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Produto excluído com sucesso');
        } else {
          console.error('Erro ao excluir o produto');
        }
      })
      .catch(error => {
        console.error('Erro ao excluir o produto:', error);
      });

      AtualizarTabelaProdutos();
}




function adicionarAoCarrinho(codigo) {
    carrinho.push(codigo);
}

function excluirDoCarrinho(codigo, excluirtudo) {

    const indice = carrinho.findIndex(item => item === codigo);
    if (indice !== -1 || excluirtudo == 1) {
      carrinho.splice(indice, 1); // Remove o código do carrinho
      exibirProdutosCarrinho(); // Atualiza a exibição do carrinho
    }
    
}


// Função para obter os detalhes de um produto pelo código
function obterDetalhesProduto(codigo) {
    return fetch(`http://localhost:3003/produtos/${codigo}`)
    .then(response => response.json())
    .catch(error => {
        console.error(`Erro ao obter detalhes do produto ${codigo}:`, error);
    });
}


// Função para exibir os produtos do carrinho na modal
function exibirProdutosCarrinho(exibir) {
    const listaProdutos = document.getElementById("listaProdutos");
    listaProdutos.innerHTML = ""; // Limpa a lista antes de preencher novamente
    var totalValor=0;
    var totalQuantidade=0;
    const codigosExibidos = {};

    carrinho.forEach(codigo => {
    obterDetalhesProduto(codigo)
        .then(produto => {

            if (!codigosExibidos[codigo]) {
                codigosExibidos[codigo] = true; 

                const quantidade = carrinho.reduce((count, codigo) => {
                    if (codigo === produto.codigo) {
                    return count + 1;
                    }
                    return count;
                }, 0);
                
                preco = parseFloat(produto.preco);
                total = preco*quantidade;
                totalValor += total;

                const row = document.createElement("tr");
                
            
                const itemProduto = document.createElement("td");
                itemProduto.textContent = `${produto.nome}`;
                row.appendChild(itemProduto);

                const itemProdutoPreco = document.createElement("td");
                itemProdutoPreco.textContent = `R$ ${preco} `;
                row.appendChild(itemProdutoPreco);

                const itemProdutoquantidade = document.createElement("td");
                itemProdutoquantidade.textContent = quantidade;
                row.appendChild(itemProdutoquantidade);

                const itemProdutoTotal = document.createElement("td");
                itemProdutoTotal.textContent = `R$ ${total} `;
                row.appendChild(itemProdutoTotal);

                const acoesCell = document.createElement("td");
                const excluirButton = document.createElement("button");
                excluirButton.textContent = "Excluir";
                acoesCell.appendChild(excluirButton);
                row.appendChild(acoesCell);

                


                excluirButton.addEventListener("click", function() {
                    excluirDoCarrinho(codigo , 0);
                    
                    console.log(carrinho);
                });


                listaProdutos.appendChild(row);



            } else {
                const linhaExistente = document.querySelector(
                    `#listaProdutos tr[data-codigo="${codigo}"]`
                  );
                  const itemProdutoQuantidade = linhaExistente.querySelector("td:nth-child(3)");
                  const itemProdutoTotal = linhaExistente.querySelector("td:nth-child(4)");
          
                  const quantidade = carrinho.reduce((count, c) => {
                    if (c === codigo) {
                      return count + 1;
                    }
                    return count;
                  }, 0);
          
                  const preco = parseFloat(produto.preco);
                  const total = preco * quantidade;
          
                  itemProdutoQuantidade.textContent = quantidade;
                  itemProdutoTotal.textContent = `R$ ${total}`;


            }



        });

    });


    exibirTotal(totalQuantidade,totalValor);

    // Exibe a modal
    if(exibir == 0){
        const modalCarrinho = document.getElementById("modalCarrinho");
        modalCarrinho.style.display = "block";
    }

}


    
function exibirTotal(quantidadeT,total){
    const listaTotal = document.getElementById("Totais");
    listaTotal.innerHTML = ""; // Limpa a lista antes de preencher novamente

    const row = document.createElement("tr");
                
            
    const itemQuant = document.createElement("td");
    itemQuant .textContent = `${quantidadeT}`;
    row.appendChild(itemQuant );

    const itemProdutoPreco = document.createElement("td");
    itemProdutoPreco.textContent = `${total}`;
    row.appendChild(itemProdutoPreco);

    listaTotal.appendChild(row);


}



