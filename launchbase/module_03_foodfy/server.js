const express = require('express')
const nunjucks = require('nunjucks')
const data = require('./data')

const server = express()


server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server
})

server.get("/", function(req, res){
    return res.render("home", { items: data })
})

server.get("/about", function(req, res){
    return res.render("about")
})

server.get("/recipes", function(req, res){
    return res.render("recipes", { items: data })
})

server.get("/recipes/:index", function (req, res) {
  const recipeIndex = req.params.index;
  const recipe = data[recipeIndex];

  if (!recipe){
    return res.render("not-found");
  }else{
    return res.render("recipe-details", {item: recipe} );}
})

server.use(function(req,res){
    res.status(404).render("not-found")
})

server.listen(5002, function(){
    console.log("Server is runing.")
})