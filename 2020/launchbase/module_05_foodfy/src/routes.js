const express = require("express")
const routes = express.Router()

const recipes = require("./app/controllers/recipes")
const chefs = require("./app/controllers/chefs")
const { recipesSite } = require("./app/controllers/recipes")

routes.get("/", recipes.indexSite)
routes.get("/about", recipes.aboutSite)
routes.get("/recipes", recipes.recipesSite)
routes.get("/recipes/:index", recipes.showRecipeSite)

routes.get("/chefs", function(req, res){
    return res.render("site/chefs")
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