
// 1 - instalar express - framework web para criação do servidor
const express = require('express') //carrega o pacote na variavel

//4- instalar nunjuks (npm install nunjuks)
const nunjucks = require('nunjucks') //motor de templates, views, reuso de código

// 2- carregar em uma variável as funções do express
const server = express() //carrega a função para a variavel servidor

//8- definindo a pasta para arquivos estaticos (scripts, css...)
server.use(express.static('public'))

//5- configurando o tipo de arquivo a ser renderizado e enviado ao servidor
server.set("view engine", "html")

//6- indicando pasta padrão para o server, com nunjucks
nunjucks.configure("views", {
    express: server
})

//7- rotas com função get para receber a requisição (request) e responder (response) a chamada da página
server.get("/", function(req, res){
    return res.render("about")
})

server.get("/portifolio", function(req, res){
    return res.render("portifolio")
})

//3 - definindo a porta para execução doservidor 
//e instalar nodemon como dependências de desenvolvimento (npm install -D nodemon)
server.listen(5000, function(){
    console.log('server is running')
})