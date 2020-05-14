const fs = require('fs')
const data = require('./data.json')
const { age, graduation, date } = require('./utils')
const Intl = require('intl')

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

//GET show
exports.show = function(req,res){

    const {id} = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Professor não encontrado!")

    const teacher = {
        ...foundTeacher,
        data_nascimento: age(foundTeacher.data_nascimento),
        data_cadastro: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.data_cadastro),
        area_atuacao: foundTeacher.area_atuacao.split(","),
        grau_escolaridade: graduation(foundTeacher.grau_escolaridade)
    }

    return res.render("teachers/show", { teacher })


}

//POST edit
exports.edit = function(req,res){

    const { id } = req.params

    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Professor não encontrado!")

    const teacher = {
        ...foundTeacher,
        data_nascimento: date(foundTeacher.data_nascimento)
    }

    return res.render("teachers/edit", { teacher })


}