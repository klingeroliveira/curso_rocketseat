const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports={
    all(params){

        const {filter, limit, offset, callback} = params

        let query = "",
            filterQuery = "",
            totalQuery = `(select count(*) from recipes) as total`

        if (filter){
            filterQuery = `
                where (recipes.title ILIKE '%${filter}%'
                    or cast(recipes.ingredients as varchar) ILIKE '%${filter}%')
            `

            totalQuery = `
                (select count(*) from recipes
                    ${filterQuery}
                ) as total
            `
        }

        query = `
            Select recipes.chef_id,
                chefs.name as author,
                recipes.id,
                recipes.title,
                recipes.image,
                ${totalQuery}
            from recipes
                inner join chefs on chefs.id = recipes.chef_id
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `

        db.query(query,[limit,offset], function(err,results){
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
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) values ($1, $2, $3, $4, $5, $6)
            returning id
        `

        const values = [
            body.author,
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
                recipes.title,
                recipes.image,
                recipes.ingredients,
                recipes.preparation,
                recipes.information
            from recipes
                inner join chefs on chefs.id = recipes.chef_id
            where recipes.id = $1
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
                title = $3,
                ingredients = $4,
                preparation = $5,
                information = $6
            where id = $1    
        `
        const values = [
            parseInt(body.id),
            body.author,
            body.title,
            body.ingredients,
            body.preparation,
            body.information
        ]

        db.query(query, values, function(err){
            if (err) throw(`Erro ao alterar Receita! ${err}`)

            callback()
        })
    },

    delete(id,callback){
        db.query(`delete from recipes where id = $1`, [id], function(err){
            if (err) throw(`Erro ao deletar Receita! ${err}`)

            callback()
        })
    },

    listIndexSite(callback){

        const query = `
            Select recipes.chef_id,
                chefs.name as author,
                recipes.id,
                recipes.title,
                recipes.image
            from recipes
                inner join chefs on chefs.id = recipes.chef_id
            limit 6
        `
        db.query(query, function(err,results){
            if (err) throw(`Erro ao listar Receitas! ${err}`)

            callback(results.rows)
        })
    }
}