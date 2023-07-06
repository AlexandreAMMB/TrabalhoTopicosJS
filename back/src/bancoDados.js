const fs = require('fs')
//carrega o arquivo JSON
const produtos = require('./produtos')

//retorna todo o arquivo JSON
function getProdutos() {
    return produtos
}

//retorna 1 produto do arquivo JSON
function getProduto(codigo) {
    for(const produto of produtos) {
        if(produto.codigo == codigo) {
            return produto || {}
        }
    }
}

//Salva um produto na no final do arquivo JSON
function salvarProduto(produto) {

   
    if(produtos.includes(produto)) {
        produtos.indexOf(produto)

        fs.writeFile("produtos.json", JSON.stringify(produtos), err => {

            if(err) throw err
    
            console.log("Produto Salvo!")
        })
    } else {
        //Insere o produto novo no buffer do arquivo
        produtos.push(produto)

        //Sobrescreve o arquivo com a nova lista de produtos
        fs.writeFile("produtos.json", JSON.stringify(produtos), err => {

            if(err) throw err

            console.log("Produto Salvo!")
        })
    }

    return produto
}

//Exclui do arquivo JSON o produto com o codigo informado
function excluirProduto(codigo) {

    var produtoRemovido = {}

    //controlador para caso o codigo N seja encontrado=
    var signal = 1

    //procura o produto com o codigo informado
    for(const produto of produtos) {
        if(produto.codigo == codigo) {
            produtos.splice(produtos.indexOf(produto), 1)
            produtoRemovido = produto
            signal = 0
            break
        }
    }

    //caso onde o código não é encontrado
    if(signal) {
        console.log(`Produto com código ${codigo} não foi encontrado!`)
        return {}
    }

    //Sobrescreve o arquivo com a nova lista de produtos
    fs.writeFile("produtos.json", JSON.stringify(produtos), err => {

        if(err) throw err

        console.log("Produto Excluído!")
    })

    return produtoRemovido
}

/*
function escrever(){

    //cria um produto
    let produto = {
        codigo: 11111,
        nome: "Novo Produto",
        preco: 21        
    }

    //inclui um produto
    produtos.push(produto)

    //escreve no arquivo json
    fs.writeFile("produtos.json", JSON.stringify(produtos), err => {
        if(err) throw err

        console.log("Done writing")
    })

    console.log(produtos)
}
*/

//exporta a função
module.exports = {
    //escrever
    getProdutos,
    getProduto,
    salvarProduto,
    excluirProduto
}