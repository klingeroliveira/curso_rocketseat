const express = require("express")
const data = require('./config/data.json')
const routes = express.Router()

const recipes = require("./app/controllers/recipes")
const chefs = require("./app/controllers/chefs")

routes.get("/", function(req, res){
    return res.render("site/home", { items: data.receitas })
})

routes.get("/about", function(req, res){
    return res.render("site/about")
})

routes.get("/recipes", function(req, res){
    return res.render("site/recipes", { items: data.receitas })
})

routes.get("/chefs", function(req, res){
    return res.render("site/chefs")
})

routes.get("/recipes/:index", function (req, res) {
  const recipeIndex = req.params.index;
  const recipe = data.receitas[recipeIndex];

  if (!recipe){
    return res.render("not-found");
  }else{
    return res.render("site/recipe-details", {item: recipe} );}
})


routes.get("/admin", function(req, res){
    return res.render("admin/layout")
})
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)


routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)

routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)
routes.delete("/admin/chefs", chefs.delete)

routes.use(function(req,res){
    res.status(404).render("not-found")
})

module.exports = routes