const db = require("../../config/db")
const {dateFormat} = require("../../lib/utils")

module.exports = {

    all(callback){
        db.query("Select * from teachers order by nome asc",function(err, results){
            if (err) throw(`Erro ao consultar dados! ${err}`)

            return callback(results.rows)
        })
    },

    insert(body,callback){

        const query = `INSERT INTO public.teachers(
            avatar_url, nome, data_nascimento, grau_escolaridade, tipo_aula, areas_atuacao, data_cadastro)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id`

        const values = [
            body.avatar_url,
            body.nome,
            dateFormat(body.data_nascimento).iso,
            body.grau_escolaridade,
            body.tipo_aula,
            body.areas_atuacao,
            dateFormat(Date.now()).iso
        ] 

        db.query(query,values,function(err, result){
            if (err) throw(`Erro ao gravar dados! ${err}`)

            return callback(result.rows[0].id)
        })
    },

    find(id,callback){
        db.query(`SELECT * FROM teachers where id = ($1)`, [id], function(err,result){
            if (err) throw(`Erro ao consultar dados! ${err}`)

            return callback(result.rows[0])
        })
    },

    put(body,callback){
        const query = `
            update teachers set
                avatar_url = $2, nome = $3, data_nascimento = $4, grau_escolaridade = $5, tipo_aula = $6, areas_atuacao = $7
            where id = $1
        `

        const values = [
            body.id,
            body.avatar_url,
            body.nome,
            dateFormat(body.data_nascimento).iso,
            body.grau_escolaridade,
            body.tipo_aula,
            body.areas_atuacao]
        
            db.query(query, values, function(err){
                if (err) throw(`Erro ao atualizar dados! ${err}`)

                return callback()
            })
    },

    delete(id,callback){

        db.query(`delete from teachers where id = $1`, [id], function(err){
            if (err) throw(`Erro ao excluir dados! ${err}`)

            return callback()
        })
    }
}