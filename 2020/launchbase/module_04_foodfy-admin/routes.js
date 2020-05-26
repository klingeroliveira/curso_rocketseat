const express = require("express")
const data = require('./data')
const routes = express.Router()

const receitas = require("./controllers/receitas")

routes.get("/", function(req, res){
    return res.render("home", { items: data })
})

routes.get("/about", function(req, res){
    return res.render("about")
})

routes.get("/recipes", function(req, res){
    return res.render("recipes", { items: data })
})

routes.get("/recipes/:index", function (req, res) {
  const recipeIndex = req.params.index;
  const recipe = data[recipeIndex];

  if (!recipe){
    return res.render("not-found");
  }else{
    return res.render("recipe-details", {item: recipe} );}
})


routes.get("/admin/receitas", receitas.index)
routes.get("/admin/receitas/create", receitas.create)
routes.get("/admin/receitas/:id", receitas.show)
routes.get("/admin/:id/edit", receitas.edit)

routes.post("/admin/receitas", receitas.post)

routes.use(function(req,res){
    res.status(404).render("not-found")
})

module.exports = routes