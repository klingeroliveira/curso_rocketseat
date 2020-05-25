const express = require("express")
const data = require('./data')
const routes = express.Router()

const recipes = require("./controllers/recipes")

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


routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)

routes.use(function(req,res){
    res.status(404).render("not-found")
})

module.exports = routes