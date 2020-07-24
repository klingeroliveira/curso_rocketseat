const db = require('../../config/db')
const {date} = require('../../lib/utils')

module.exports = {

    all(callback){

        const query = `SELECT * FROM chefs`

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

            callback(results.rows[0])
        })
    },

    find(id, callback){
        
        const query = `
                select chefs.id as chef_id, 
                    chefs.name as chef_name, 
                    chefs.avatar_url chef_image, 
                    
                    coalesce( (select count(rt.id) 
                                from recipes rt
                                where rt.chef_id = chefs.id 
                                group by rt.id)
                            ,0) as chef_total_recipes,

                    recipes.id as recipes_id,
                    recipes.image as recipes_image,
                    title as recipes_title
                from chefs
                    left join recipes on recipes.chef_id = chefs.id
                where chefs.id = $1`

        db.query(query, [id], function(err, results){
            if (err) throw(`Erro ao buscar Chef! ${err}`)

            callback(results.rows[0])
        })
    },

    update(body, callback){
        const query = `
            update chefs set
                name = $2
                avatar_url = $3
            where id = $1`
        
        const values = [
            body.name,
            body.avatar_url,
            body.id
        ]

        db.query(query,values, function(err){
            if (err) throw(`Erro ao editar Chef! ${err}`)

            callback()
        })
    }
}