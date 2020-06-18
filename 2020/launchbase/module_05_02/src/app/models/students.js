const db = require("../../config/db")
const {dateFormat} = require("../../lib/utils")

module.exports = {

    all(callback){
        db.query("select * from students order by nome asc", function(err, students){
            if (err) throw(`Erro ao consultar todos! ${err}`)

            return callback(students.rows)
        })
    },

    create(body,callback){
        const query = `INSERT INTO students(
            avatar_url, nome, email, data_nascimento, ano_escolar, carga_horaria)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id`

        const values =[
            body.avatar_url, body.nome, body.email, 
            dateFormat(body.data_nascimento).iso, body.ano_escolar, body.carga_horaria
        ]

        db.query(query, values, function(err,student){
            if (err) throw(`Erro ao gravar dados! ${err}`)

            return callback(student.rows[0].id)
        })
    },

    find(id,callback){
        db.query(`SELECT * FROM students WHERE id = ($1)`, [id], function(err,student){
            if (err) throw(`Erro ao consultar estudante! ${err}`)

            return callback(student.rows[0])
        })
    },

    update(body,callback){
        const query = `update students set 
                avatar_url = $2, nome = $3, email = $4, data_nascimento = $5, ano_escolar = $6, carga_horaria = $7
            where id = $1`

        const values = [
            body.id, body.avatar_url, body.nome, body.email, 
            dateFormat(body.data_nascimento).iso, body.ano_escolar, body.carga_horaria
        ]

        db.query(query, values, function(err){
            if (err) throw(`Erro ao atualizar dados! ${err}`)

            return callback()
        })
    },

    delete(id,callback){
        db.query(`delete from students where id = $1`, [id], function(err){
            if (err) throw(`Erro ao apagar estudante! ${err}`)

            return callback()
        })
    }
}