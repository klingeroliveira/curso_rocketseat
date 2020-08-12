const Recipes = require('../models/recipes')

module.exports = {

    indexSite(req,res){

        Recipes.listIndexSite(function (recipes) {
            return res.render("site/home", { items: recipes })
        })
    },

    aboutSite(req,res){

        return res.render("site/about")
    },

    recipesSite(req, res){

        const {filter} = req.query

        if (filter)
        {
            Recipes.all(filter, function(recipes){
                return res.render("site/recipes", { items: recipes, filter })
            })
        } else {
            Recipes.all("", function(recipes){
                return res.render("site/recipes", { items: recipes, filter })
            })
        }
    },

    showRecipeSite(req,res){
        
        Recipes.find(req.params.index, function(recipe){
            if (!recipe) return res.render("not-found");

            return res.render("site/recipe-details", {item: recipe})
        })
    },

    index(req,res){
        
        Recipes.all('', function(recipes){
            return res.render("admin/recipes/index", { items: recipes } )
        })
    },

    create(req,res){
        Recipes.chefSelectedOptions(function(chefs){
            return res.render("admin/recipes/create", {chefs})
        })
    },

    post(req,res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if(req.body[key] == "")
                return res.send("Preencha todos os campos!")
        }

        Recipes.insert(req.body, function(id){
            return res.redirect(`/admin/recipes/${id}`)
        })
    },

    show(req, res) {
        
        Recipes.find(req.params.id, function(recipe){
            if (!recipe) return res.send("Receita não encontrada!")

            return res.render("admin/recipes/show", {item: recipe})
        })

    },

    edit(req, res) {

        Recipes.find(req.params.id, function(recipe){
            if (!recipe) return res.send("Receita não encontrada!")

            Recipes.chefSelectedOptions(function(chefs){
                return res.render("admin/recipes/edit", {recipe, chefs} )        
            })
        })
    },

    put(req,res) {

        Recipes.update(req.body, function(){
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })

    },

    delete(req,res) {
        
        Recipes.delete(req.body.id, function(){
            return res.redirect("/admin/recipes")
        })
    }
}