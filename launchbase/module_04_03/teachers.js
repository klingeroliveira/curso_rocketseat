const fs = require('fs')
const data = require('./data.json')

//POST create
exports.post =  function (req, res){

    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Preencha todos os campos!")
        }
    }

    let { avatar_url, nome, data_nascimento, grau_escolaridade, tipo_aula, area_atuacao } = req.body

    const id = Number(data.teachers.length + 1)
    const data_cadastro = Date.now()

    data_nascimento = Date.parse(data_nascimento)
    
    data.teachers.push({id, avatar_url, nome, data_nascimento, grau_escolaridade, tipo_aula, area_atuacao, data_cadastro})

    fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function(err){
        if (err) return res.send("Erro ao gravar dados!")

        return res.redirect("/teachers")
    })

}