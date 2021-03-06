const Recipes = require('../models/recipes')
const Files = require('../models/files')

module.exports = {

    indexSite(req,res){

        Recipes.listIndexSite(function (recipes) {
            const newItens = recipes.map( recipes => ({
                ...recipes,
                src: `${req.protocol}://${req.headers.host}${recipes.image.replace("public","")}`
            }))

            return res.render("site/home", { items: newItens })
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

                const newItens = recipes.map( recipes => ({
                    ...recipes,
                    src: `${req.protocol}://${req.headers.host}${recipes.image.replace("public","")}`
                }))

                return res.render("site/recipes", {items: newItens, filter, pagination, titleFind})
            }
        }

        Recipes.all(params)
    },

    async showRecipeSite(req,res){
        
        let results = await Recipes.find(req.params.index) 

        const recipe = results.rows[0]

         //get images
         results = await Recipes.files(recipe.id)
         let files = ""
 
         if (results.rows.length > 0){
 
             files = results.rows.map(file => ({
                 ...file,
                 src: `${req.protocol}://${req.headers.host}${file.path.replace("public","")}`
             }))
         }

        return res.render("site/recipe-details", {item: recipe, files})
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

                
                const newItens = recipes.map( recipes => ({
                    ...recipes,
                    src: `${req.protocol}://${req.headers.host}${recipes.image.replace("public","")}`
                }))

                return res.render("admin/recipes/index", {items: newItens, filter, pagination, titleFind})
            }
        }

        
        Recipes.all(params)
    },

    async create(req,res){
        
        const chefs = await Recipes.chefSelectedOptions()
        
        return res.render("admin/recipes/create", {chefs: chefs.rows})
    },

    async post(req,res) {

        const keys = Object.keys(req.body)

        for (key of keys) {

            if (req.body[key] == "" 
                    && key != "removed_files" 
                    && key != "button_salvar_edit"
                    && key != "photos")
                return res.send("Preencha todos os campos.")
        }

        if(req.files.length == 0){
            return res.send("Envie pelo menos uma imagem.")
        }

        //grava receita
        let results = await Recipes.insert(req.body)
        const recipe_id = results.rows[0].id

        //grava imagens
        const filesPromise = req.files.map(file=>
            Files.create({...file}))

        //grava imagens x receita
        await Promise.all(filesPromise)
            .then(result =>
                {
                    for (let index = 0; index < result.length; index++){
                        let element = result[index].rows;
                        Files.createRecipeFiles({ file_id: element[0].id, recipe_id })
                    }
                })

        return res.redirect(`/admin/recipes/${recipe_id}`)
        
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
               Files.delete({id: id})
            })

            await Promise.all(removedFilesPromise)
        }

        
        //validar se já não existem 5 imagens no total
        const oldFiles = await Recipes.files(req.body.id)
        const totalFiles = oldFiles.rows.length + req.files.length
        
        if (totalFiles == 0){
            return res.send("Adicione pelo menos uma imagem!")
        }
            
        if (totalFiles > 5){
            return res.send("Máximo de 5 imagens!")    
        }

        if (req.files.length > 0){
            //grava imagens
            const newFilesPromise = req.files.map(file => 
                Files.create({...file}))


            //grava imagens x receita
            await Promise.all(newFilesPromise)
                .then(result => 
                    {
                        for (let index = 0; index < result.length; index++) {
                            let element = result[index].rows;
                            Files.createRecipeFiles({ file_id: element[0].id, recipe_id: req.body.id })
                        }
                    }
                )
        }

        await Recipes.update(req.body)

        return res.redirect(`/admin/recipes/${req.body.id}`)

    },

    async delete(req,res) {

        const results = await Recipes.files(req.body.id)
        
        const newResultPromisse = results.rows.map(files => {
            Files.delete({...files})
        })

        await Promise.all(newResultPromisse)
        .then( () => 
            {
                Recipes.delete(req.body.id)
            })
           
        return res.redirect("/admin/recipes")
        
    }
}