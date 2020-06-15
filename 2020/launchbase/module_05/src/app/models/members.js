const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {

    all(callback){

        db.query(`SELECT * FROM members ORDER BY name`, function(err, results){
            if (err) throw(`Erro ao buscar dados! ${err}`)

            callback(results.rows)
        })

    },

    create(body, callback){

        const query = `
            INSERT INTO members(
                avatar_url,
                name,
                email,
                birth,
                gender,
                blood,
                weight,
                height)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            body.avatar_url,
            body.name,
            body.email,
            date(body.birth).iso,
            body.gender,
            body.blood,
            body.weight,
            body.height,
        ]

        db.query(query, values, function(err, results){
            if (err) throw(`Erro ao gravar dados! ${err}`)
            
            callback(results.rows[0])
        })

    },

    find(id, callback){

        db.query(`SELECT * FROM members where id = ($1)`, [id], function(err, results){
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