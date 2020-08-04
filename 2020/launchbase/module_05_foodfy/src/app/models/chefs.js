const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports = {

    all(callback){

        const query = `SELECT * FROM chefs order by name`

        db.query(query,function(err, results){
            if (err) throw(`Erro ao listar Chefs! ${err}`)

            callback(results.rows)
        })
    },

    create(body, callback){

        const query = ` 
            Insert into chefs(
                name,
                avatar_url,
                created_at)
            Values ($1,$2,$3)
            Returning id`

        const values = [
            body.name,
            body.avatar_url,
            date(Date.now()).iso,
        ]

        db.query(query, values, function(err,results){
            if (err) throw(`Erro ao gravar Chef! ${err}`)
            
            callback(results.rows[0].id)
        })
    },

    find(id, callback){
        
        const query = `
                select chefs.id, 
                    chefs.name, 
                    chefs.avatar_url, 
                    
                    coalesce( (select count(rt.chef_id)
                                from recipes rt
                                where rt.chef_id = chefs.id 
                                group by rt.chef_id)
                            ,0) as total_recipes
                from chefs
                where chefs.id = $1`

        db.query(query, [id], function(err, results){
            if (err) throw(`Erro ao buscar Chef! ${err}`)

            callback(results.rows[0])
        })
    },

    findRecipes(id, callback){
        
        const query = `
                select recipes.*, chefs.name as chef_name
                from recipes
                inner join chefs on recipes.chef_id = chefs.id
                where recipes.chef_id = $1`

        db.query(query, [id], function(err, results){
            if (err) throw(`Erro ao buscar Chef! ${err}`)

            callback(results.rows)
        })
    },

    update(body, callback){
        const query = `
            update chefs set
                name = $2,
                avatar_url = $3
            where id = $1`
        
        const values = [
            body.id,
            body.name,
            body.avatar_url
        ]

        db.query(query,values, function(err){
            if (err) throw(`Erro ao editar Chef! ${err}`)

            callback()
        })
    },

    cheqDelete(id,callback){
        const query= `
            select * from chefs
             where chefs.id = $1
                and exists (select distinct 1 from recipes 
                            where recipes.chef_id = chefs.id)`
        db.query(query, [id], function(err, results){
            if (err) throw(`Erro ao checar Chef! ${err}`)

            callback(results.rows[0])
        })
    },

    delete(id, callback){
        const query= `delete from chefs
                where chefs.id = $1
                and not exists (select distinct 1 from recipes 
                                 where recipes.chef_id = chefs.id)`

        db.query(query, [id], function(err){
            if (err) throw(`Erro ao deletar Chef! ${err}`)

            callback()
        })
    }
}