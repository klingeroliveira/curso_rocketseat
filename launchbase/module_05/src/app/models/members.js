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
                height,
                instructor_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
            body.instructor
        ]

        db.query(query, values, function(err, results){
            if (err) throw(`Erro ao gravar dados! ${err}`)
            
            callback(results.rows[0])
        })

    },

    find(id, callback){

        db.query(`SELECT members.*, coalesce(instructors.name,'') as instructor_name
                    FROM members 
                        LEFT JOIN instructors on members.instructor_id = instructors.id
                   WHERE members.id = $1`, [id], function(err, results){

            if (err) throw(`Erro ao buscar dados! ${err}`)

            callback(results.rows[0])
        })
    },

    findBy(filter, callback){

        db.query(`SELECT * FROM members 
                  WHERE name ILIKE '%${filter}%' ORDER BY name`, function(err, results){
            if (err) throw(`Erro ao buscar dados! ${err}`)

            callback(results.rows)
        })
    },    

    update(body, callback){
        const query = ` 
            UPDATE members SET
            avatar_url = $1,
            name = $2,
            email = $3,
            birth = $4,
            gender = $5,
            blood = $6,
            weight = $7,
            height = $8,
            instructor_id= $9
            WHERE id = $10
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
            body.instructor,
            body.id,
        ]

        db.query(query, values, function(err, results){
            if (err) throw(`Erro ao gravar dados! ${err}`)

            callback()
        })
    },

    delete(id, callback){

        db.query(`DELETE FROM members WHERE id = ($1)`, [id], function(err, results){
            if (err) throw(`Erro ao apagar dados! ${err}`)

            callback()
        })
    },

    instructorsSelectOption(callback){
        db.query("Select name, id from instructors order by name asc", function(err, instructors){
            if (err) throw (`Erro ao consultar instructors! ${err}`)

            return callback(instructors.rows)
        })
    },

    paginate(params){

        const { filter, limit, offset, callback } = params
        
        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT count(*) FROM members) AS total`

        if (filter) {
            filterQuery = `
                WHERE members.name ILIKE '%${filter}%'
                    OR  members.email ILIKE '%${filter}%'
            `
            totalQuery = `
                (SELECT count(*) FROM members
                ${filterQuery}
             ) AS total`
        }

        query = `
            SELECT members.*, ${totalQuery}
            FROM members
            ${filterQuery}
            LIMIT $1 OFFSET $2
        `
        
        db.query(query, [limit, offset], function(err, results){
            if (err) throw(`Erro ao consultar Membros! ${err}`)
            
            return callback(results.rows)
        })
    }
}