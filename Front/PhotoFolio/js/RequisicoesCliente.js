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
    });
  })
  .catch(error => {
    console.error("Erro ao obter os produtos:", error);
});