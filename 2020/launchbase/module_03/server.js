const express = require('express') //carrega o pacote na variavel
const nunjucks = require('nunjucks') //motor de templates, views, reuso de código

const server = express() //carrega a função para a variavel servidor

//criando pasta public para colocar arquivos estaticos
server.use(express.static('public'))

//configurando tamplate engine
server.set("view engine", "html")

nunjucks.configure("views", {
    express: server
})

//função para uma roda, o servidor receber a requisição (request) e responde (response)
server.get("/", function(req, res){
    return res.render("about")
})

server.get("/portifolio", function(req, res){
    return res.render("portifolio")
})

//iniciando o servidor na porta 5000
server.listen(5000, function(){
    console.log('server is running')
})