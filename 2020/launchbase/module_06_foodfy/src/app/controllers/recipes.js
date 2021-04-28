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

        console.log(req.files)

        const filesPromise = req.files.map(file=>
            Files.create({...file, recipes_id: recipesId})
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

    async put(req,res) {

        const keys = Object.keys(req.body)
        

        for (key of keys) {
            console.log(key + req.body[key])
            if (req.body[key] == "" && key != "removed_files")
                return res.send("Preencha todos os campos.")
        }

        if(req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(id => Files.delete(id))

            await Promise.all(removedFilesPromise)
        }


        if (req.files.length != 0){

            //validar se já não existem 6 imagens no total

            const oldFiles = await Product.files(req.body.id)
            const totalFiles = oldFiles.rows.length + req.files.length

            if (totalFiles <= 6){

                const newFilesPromise = req.files.map(file => 
                    Files.create({...file, product_id: req.body.id}))

                await Promise.all(newFilesPromise)
            }
        }

       
        await Recipes.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)
    },

    delete(req,res) {
        
        Recipes.delete(req.body.id, function(){
            return res.redirect("/admin/recipes")
        })
    }
}