var carrinho = [];


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


}



fetch("http://localhost:3003/produtos")
  .then(response => response.json())
  .then(data => {
    const corpoTabela = document.getElementById("corpoTabela");

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

      const editarButton = document.createElement("button");
      editarButton.textContent = "Editar";
      acoesCell.appendChild(editarButton);

      row.appendChild(acoesCell);




    });
  })
  .catch(error => {
    console.error("Erro ao obter os produtos:", error);
});


function adicionarAoCarrinho(codigo) {
    carrinho.push(codigo);
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

    // Exibe a modal
    if(exibir == 0){
        const modalCarrinho = document.getElementById("modalCarrinho");
        modalCarrinho.style.display = "block";
    }
    

}


    



