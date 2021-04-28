const Recipes = require('../models/recipes')
const Files = require('../models/Files')

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

        let {filter, page,limit} = req.query

        page = page || 1
        limit = limit || 6
        let offset = limit * (page-1),
            titleFind = ""

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){
                const pagination = {
                    total: Math.ceil( +recipes[0].total / limit),
                    page
                }
                
                if (filter) titleFind = `Buscando por "${filter}"`

                return res.render("site/recipes", {items: recipes, filter, pagination, titleFind})
            }
        }

        Recipes.all(params)
    },

    showRecipeSite(req,res){
        
        Recipes.find(req.params.index, function(recipe){
            if (!recipe) return res.render("not-found");

            return res.render("site/recipe-details", {item: recipe})
        })
    },

    index(req,res){

        let {filter, page,limit} = req.query

        page = page || 1
        limit = limit || 4
        let offset = limit * (page-1),
            titleFind = ""

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){
                const pagination = {
                    total: Math.ceil( +recipes[0].total / limit),
                    page
                }
                
                if (filter) titleFind = `Buscando por "${filter}"`

                return res.render("admin/recipes/index", {items: recipes, filter, pagination, titleFind})
            }
        }

        Recipes.all(params)
        /*
        Recipes.all('', function(recipes){
            return res.render("admin/recipes/index", { items: recipes } )
        })*/
    },

    create(req,res){
        Recipes.chefSelectedOptions(function(chefs){
            return res.render("admin/recipes/create", {chefs})
        })
    },

    async post(req,res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if(req.body[key] == "")
                return res.send("Preencha todos os campos!")
        }

        if(req.files.length == 0){
            return res.send("Envie pelo menos uma imagem.")
        }

        let results = await Recipes.create(req.body)
        const recipesId = results.rows[0].id

        const filesPromise = req.files.map(file=>
            files.create({...file, recipes_id: recipesId})
        )

        await Promise.all(filesPromise)

        return res.redirect(`/admin/recipes/${id}`)
        
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