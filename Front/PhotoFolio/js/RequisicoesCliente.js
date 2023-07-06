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


    const btnCarrinho = document.getElementById("btnCarrinho");
    btnCarrinho.addEventListener("click", console.log(carrinho));


// // Função para obter os detalhes de um produto pelo código
// function obterDetalhesProduto(codigo) {
//     return fetch(`http://localhost:3003/produtos/${codigo}`)
//       .then(response => response.json())
//       .catch(error => {
//         console.error(`Erro ao obter detalhes do produto ${codigo}:`, error);
//       });
//   }
  
//   // Função para exibir os produtos do carrinho na modal
//   function exibirProdutosCarrinho() {
//     const listaProdutos = document.getElementById("listaProdutos");
//     listaProdutos.innerHTML = ""; // Limpa a lista antes de preencher novamente
  
//     carrinho.forEach(codigo => {
//       obterDetalhesProduto(codigo)
//         .then(produto => {
//           const itemProduto = document.createElement("li");
//           itemProduto.textContent = `${produto.nome} - R$ ${produto.preco.toFixed(2)}`;
//           listaProdutos.appendChild(itemProduto);
//         });
//     });
  
//     // Exibe a modal
//     const modalCarrinho = document.getElementById("modalCarrinho");
//     modalCarrinho.style.display = "block";
//   }
  
//   // Evento de clique no botão "Carrinho"
    
  


