const db = require('../../config/db')
const { age, date } = require('../../lib/utils')

module.exports = {

    all(callback){

        db.query(`SELECT * FROM instructors ORDER BY name`, function(err, results){
            if (err) throw(`Erro ao buscar dados! ${err}`)

            callback(results.rows)
        })

    },

    create(body, callback){

        const query = `
            INSERT INTO instructors(
                avatar_url,
                name,
                birth,
                gender,
                services,
                created_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            body.avatar_url,
            body.name,
            date(body.birth).iso,
            body.gender,
            body.services,
            date(Date.now()).iso,
        ]

        db.query(query, values, function(err, results){
            if (err) throw(`Erro ao gravar dados! ${err}`)
            
            callback(results.rows[0])
        })

    },

    find(id, callback){

        db.query(`SELECT * FROM instructors where id = ($1)`, [id], function(err, results){
            if (err) throw(`Erro ao buscar dados! ${err}`)

            callback(results.rows[0])
        })
    },

    update(body, callback){
        const query = ` 
            UPDATE instructors SET
                avatar_url = ($1),
                name = ($2),
                birth = ($3),
                gender = ($4),
                services = ($5)
            WHERE id = ($6)
        `

        const values = [
            body.avatar_url,
            body.name,
            date(body.birth).iso,
            body.gender,
            body.services,
            body.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw(`Erro ao gravar dados! ${err}`)

            callback()
        })
    },

    delete(id, callback){

        db.query(`DELETE FROM instructors WHERE id = ($1)`, [id], function(err, results){
            if (err) throw(`Erro ao apagar dados! ${err}`)

            callback()
        })
    }
}