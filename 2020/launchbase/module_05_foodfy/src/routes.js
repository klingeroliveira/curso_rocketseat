const express = require("express")
const data = require('./config/data.json')
const routes = express.Router()

const receitas = require("./app/controllers/receitas")
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
routes.get("/admin/recipes", receitas.index)
routes.get("/admin/recipes/create", receitas.create)
routes.get("/admin/recipes/:id", receitas.show)
routes.get("/admin/recipes/:id/edit", receitas.edit)

routes.post("/admin/recipes", receitas.post)
routes.put("/admin/recipes", receitas.update)
routes.delete("/admin/recipes", receitas.delete)


routes.get("/admin/chefs", chefs.index)
routes.get("/admin/chefs/create", chefs.create)
routes.get("/admin/chefs/:id", chefs.show)
routes.get("/admin/chefs/:id/edit", chefs.edit)

routes.post("/admin/chefs", chefs.post)
routes.put("/admin/chefs", chefs.put)

routes.use(function(req,res){
    res.status(404).render("not-found")
})

module.exports = routes