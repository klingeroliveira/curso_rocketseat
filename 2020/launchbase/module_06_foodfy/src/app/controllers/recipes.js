const Recipes = require('../models/recipes')
const Files = require('../models/files')

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

    async showRecipeSite(req,res){
        
        const results = await Recipes.find(req.params.index) 

        const recipe = results.rows[0]

        return res.render("site/recipe-details", {item: recipe})
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
            Files.createRecipesFiles({...file, recipes_id: recipesId})
        )

        await Promise.all(filesPromise)

        return res.redirect(`/admin/recipes/${id}`)
        
    },

    async show(req, res) {
        
        let results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]

        if (!recipe) return res.send("Receita não encontrada!")

        //get images
        results = await Recipes.files(recipe.id)
        let files = ""

        if (results.rows.length > 0){

            files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
            }))
        }
        
        return res.render("admin/recipes/show", {item: recipe, files})

    },

    async edit(req, res) {

        let results = await Recipes.find(req.params.id)
        const recipe = results.rows[0]

        if (!recipe) return res.send("Receita não encontrada!")

        //get images
        results = await Recipes.files(recipe.id)

        let files = ""
        
        if (results.rows.length > 0){
            files = results.rows.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
            }))
        }

        results = await Recipes.chefSelectedOptions()
        const chefs = results.rows

        return res.render("admin/recipes/edit", {recipe, chefs, files} )
    },

    async put(req,res) {

        const keys = Object.keys(req.body)
        
        
        
        for (key of keys) {

            if (req.body[key] == "" 
                    && key != "removed_files" 
                    && key != "button_salvar_edit"
                    && key != "photos")
                return res.send("Preencha todos os campos.")
        }

        if(req.body.removed_files) {
            const removedFiles = req.body.removed_files.split(",")
            const lastIndex = removedFiles.length - 1

            
            removedFiles.splice(lastIndex, 1)

            const removedFilesPromise = removedFiles.map(id => {
               Files.delete(id)
            })

            await Promise.all(removedFilesPromise)
        }

        
        //validar se já não existem 5 imagens no total

        const oldFiles = await Recipes.files(req.body.id)
        const totalFiles = oldFiles.rows.length + req.files.length
        
        if (totalFiles != 0){
            
            if (totalFiles >= 1 && totalFiles <= 5){

                const newFilesPromise = req.files.map(file => 
                    Files.create({...file}))


                await Promise.all(newFilesPromise)
                    .then(result => 
                        {
                            for (let index = 0; index < result.length; index++) {
                                let element = result[index].rows;
                                Files.createRecipeFiles({ file_id: element[0].id, recipe_id: req.body.id })
                            }
                        }
                    )

                await Recipes.update(req.body)

                return res.redirect(`/admin/recipes/${req.body.id}`)

            } else {
                return res.send("Máximo de 5 imagens!")    
            }
            
        } else {
            return res.send("Adicione pelo menos uma imagem!")
        }

        
    },

    delete(req,res) {
        
        Recipes.delete(req.body.id, function(){
            return res.redirect("/admin/recipes")
        })
    }
}