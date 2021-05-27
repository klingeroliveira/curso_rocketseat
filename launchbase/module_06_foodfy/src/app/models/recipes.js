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

                (select files.path 
                   from recipe_files 
					    inner join files on files.id = recipe_files.file_id
				  where recipes.id = recipe_files.recipe_id
				 order by files.id
				 limit 1				) as image,
                 
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

    chefSelectedOptions(){
        return db.query(`Select * from chefs order by name`)
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

    find(id){
        const query = `
            Select recipes.chef_id,
                chefs.name as author,
                recipes.id,
                recipes.title,
                (select files.path 
                    from recipe_files 
                         inner join files on files.id = recipe_files.file_id
                   where recipes.id = recipe_files.recipe_id
                  order by files.id
                  limit 1				) as image,
                recipes.ingredients,
                recipes.preparation,
                recipes.information                
            from recipes
                inner join chefs on chefs.id = recipes.chef_id
            where recipes.id = $1
        `
        
        return db.query(query, [id])
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

        return db.query(query, values)
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
                (select files.path 
                    from recipe_files 
                         inner join files on files.id = recipe_files.file_id
                   where recipes.id = recipe_files.recipe_id
                  order by files.id
                  limit 1				) as image
            from recipes
                inner join chefs on chefs.id = recipes.chef_id
            limit 6
        `

        db.query(query, function(err,results){
            if (err) throw(`Erro ao listar Receitas! ${err}`)

            callback(results.rows)
        })
    },

    files(id){
        return db.query(`
            Select f.*
            from files f
            inner join recipe_files rf on rf.file_id = f.id
                                        and rf.recipe_id = $1
        `, [id])
    }
}