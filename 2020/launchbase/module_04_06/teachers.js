const fs = require('fs')
const data = require('./data.json')
const { age, graduation, date } = require('./utils')
const Intl = require('intl')

//INDEX listar professores
exports.index = function(req, res){

    let listTeachers = data.teachers.map( teacher => {
        const areas_atuacao = teacher.areas_atuacao.split(",")

        const newTeacher = {
            ...teacher,
            areas_atuacao: areas_atuacao
        }

        return newTeacher
    })

    return res.render("teachers/index", {teachers: listTeachers})
}

//POST create
exports.post =  function (req, res){

    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Preencha todos os campos!")
        }
    }

    let { avatar_url, nome, data_nascimento, grau_escolaridade, tipo_aula, areas_atuacao } = req.body

    const id = Number(data.teachers.length + 1)
    const data_cadastro = Date.now()

    data_nascimento = Date.parse(data_nascimento)
    
    data.teachers.push({id, avatar_url, nome, data_nascimento, grau_escolaridade, tipo_aula, areas_atuacao, data_cadastro})

    fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function(err){
        if (err) return res.send("Erro ao gravar dados!")

        return res.redirect(`/teachers/${id}`)
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
        areas_atuacao: foundTeacher.areas_atuacao.split(","),
        grau_escolaridade: graduation(foundTeacher.grau_escolaridade)
    }

    return res.render("teachers/show", { teacher })


}



//GET edit
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



//POST update (PUT) 
exports.update = function(req,res){
    const {id} = req.body
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if (teacher.id == id){
            index = foundIndex
            return true
        }
    })

    if (!foundTeacher) return ("Professor não encontrado!")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        data_nascimento: Date.parse(req.body.data_nascimento),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Erro ao gravar dados!")

        return res.redirect(`/teachers/${id}`)
    })
}



//POST delete
exports.delete = function(req,res){
    const {id} = req.body

    const foundTeacher = data.teachers.filter(function(teacher){
        return teacher.id != id
    })

    data.teachers = foundTeacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send ("Erro ao gravar dados!")

        return res.redirect("/teachers")
    })
}