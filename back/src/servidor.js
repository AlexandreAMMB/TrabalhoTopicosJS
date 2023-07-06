const porta = 3003

const express = require('express')
const app = express()
//excluir dps
const bodyParser = require('body-parser') //para usar o body do postman
const fs = require('fs')
const base64 = require('base64-js')

const bancoDados = require('./bancoDados')

//exluir dps
app.use(bodyParser.urlencoded({ extended: true }))//Utilização do body parser para conversão de linhas de codigo do body para um objeto que pode ser lido pelo postman
app.use(bodyParser.json())

//Retorna todos os produtos cadastrados
app.get('/produtos', (req, res, next) => {
    res.send(bancoDados.getProdutos())
    //convertida em string JSON
})

//Retorna 1 produto
app.get('/produtos/:codigo', (req, res, next) => {
    res.send(bancoDados.getProduto(req.params['codigo']))
    //convertida em string JSON
})

//Salva 1 produto
app.post('/produtos',(req, res, next) => {
    // // Lê a imagem como um ArrayBuffer
    // const imagemBuffer = fs.readFileSync("../figura1empreendedorismo.png")

    // console.log(imagemBuffer)

    // // Converte o ArrayBuffer em um Uint8Array
    // const imagemArray = new Uint8Array(imagemBuffer)

    // // Converte o Uint8Array em uma string Base64
    // const imagemBase64 = base64.fromByteArray(imagemArray)

    const produto = bancoDados.salvarProduto(req.body.imagem, {
        codigo: req.body.codigo,
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco
        //imagem: imagemBase64
    })
    //res.send("O produto ${produto.nome} foi inserido");
    res.send(produto)
})

app.post('/produtos/imagem', (req, res, next) =>  {

    bancoDados.salvarImagem("./../figura1empreendedorismo.png")

    res.send("ok")
})

//Altera 1 produto
app.put('/produtos/:codigo', (req, res, next) => {
    const produto = bancoDados.atualizarProduto(req.params['codigo'], req.body.imagem, {
        codigo: req.body.codigo,
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco
    })
    res.send(produto);
})

//Exclui 1 produto
app.delete('/produtos/:codigo', (req, res) =>{
    const produto = bancoDados.excluirProduto(req.params['codigo'])
    res.send(produto)
})

app.use((req, res, next) => {
    res.send("URL não reconhecida")
})

app.listen(porta, () => {
    console.log(`Servidor agora executando na porta ${porta}.`)
})