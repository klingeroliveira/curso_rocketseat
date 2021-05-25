
// 1 - criar arquivo server.js
//criar arquivo packege.jcon (nom init -y)
//ninstalar express - framework web para criação do servidor
const express = require('express') //carrega o pacote na variavel

//4- instalar nunjuks (npm install nunjuks)
const nunjucks = require('nunjucks') //motor de templates, views, reuso de código

//
const videos = require('./data')

// 2- carregar em uma variável as funções do express
const server = express() //carrega a função para a variavel servidor

//8- definindo a pasta para arquivos estaticos (scripts, css...)
server.use(express.static('public'))

//5- configurando o tipo de arquivo a ser renderizado e enviado ao servidor
server.set("view engine", "njk")

//6- indicando pasta padrão para o server, com nunjucks
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

//7- rotas com função get para receber a requisição (request) e responder (response) a chamada da página
server.get("/", function(req, res){
    const about = {
        avatar: "https://avatars1.githubusercontent.com/u/60447413?v=4",
        name: "Klinger Oliveira",
        role: "Estudante de Programação",
        description: 'Estudante de programação, dando foco na <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a>.',

        links:[
            {name: "Github", url: "https://github.com/"},
            {name: "Twitter", url: "https://twitter.com/"},
            {name: "Linkedin", url: "https://br.linkedin.com/"}
        ]
    }
    return res.render("about", {about})
})

server.get("/portifolio", function(req, res){
    return res.render("portifolio", { items: videos })
})

server.get("/video", function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    }) 

    if (!video){
        return res.send("Video not found!")
    }

    return res.render("video", {item: video})
})

//3 - definindo a porta para execução doservidor 
//e instalar nodemon como dependências de desenvolvimento (npm install -D nodemon)
server.listen(5000, function(){
    console.log('server is running')
})