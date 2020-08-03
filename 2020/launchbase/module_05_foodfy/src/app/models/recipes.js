const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports={
    all(callback){
        const query = `
            Select recipes.chef_id,
                chefs.name as author,
                recipes.id,
                recipes.image,
                recipes.title,
                recipes.ingredients,
                recipes.preparation,
                recipes.information
            from recipes
                inner join chefs on chefs.id = recipes.chef_id
        `
        db.query(query, function(err,results){
            if (err) throw(`Erro ao listar Receitas! ${err}`)

            callback(results.rows)
        })
    },

    chefSelectedOptions(callback){
        db.query(`Select * from chefs order by name`, function(err,results){
            if (err) throw(`Erro ao listar Chefs para selecionar na Receita! ${err}`)

            callback(results.rows)
        })
    },

    insert(body, callback){
        const query = `
            insert into recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) values ($1, $2, $3, $4, $5, $6, $7)
            returning id
        `

        const values = [
            body.author,
            body.image,
            body.title,
            body.ingredients,
            body.preparation,
            body.information,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results){
            if (err) throw(`Erro ao cadastrar Receita! ${err}`)

            callback(results.rows[0].id)
        })

    },

    find(id, callback){
        const query = `
            Select recipes.chef_id,
                chefs.name as author,
                recipes.id,
                recipes.image,
                recipes.title,
                recipes.ingredients,
                recipes.preparation,
                recipes.information
            from recipes
                inner join chefs on chefs.id = recipes.chef_id
            where recipes.id = cast($1 as int)
        `

        db.query(query, [id], function(err, results){
            if (err) throw(`Erro ao localizar Receita! ${err}`)

            callback(results.rows[0])
        })
    },

    update(body, callback){
        const query = `
            update recipes set
                chef_id = $2,
                image = $3,
                title = $4,
                ingredients = $5,
                preparation = $6,
                information = $7
            where id = $1    
        `
        const values = [
            parseInt(body.id),
            body.author,
            body.image,
            body.title,
            body.ingredients,
            body.preparation,
            body.information
        ]

        db.query(query, values, function(err){
            if (err) throw(`Erro ao alterar Receita! ${err}`)

            callback()
        })
    }
}