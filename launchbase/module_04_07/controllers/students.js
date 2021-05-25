const fs = require('fs')
const data = require('../data.json')
const { grade, date } = require('../utils')


//GET listar
exports.index = function(req, res){

    let listStudents = data.students.map( student => {
        const ano_escolar = grade(student.ano_escolar)

        const newStudent = {
            ...student,
            ano_escolar: ano_escolar
        }

        return newStudent
    })

    return res.render("students/index", { students: listStudents})
}


//GET criar
exports.create = function(req, res){
    return res.render("students/create")
}

//POST salvar
exports.post =  function (req, res){

    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ""){
            return res.send("Preencha todos os campos!")
        }
    }

    let id = 1
    const lastStudent = data.students[ data.students.length -1 ]

    if (lastStudent) { id = lastStudent.id + 1 }

    data_nascimento = Date.parse(req.body.data_nascimento)
    
    data.students.push({
        id,
        ...req.body,
        data_nascimento})

    fs.writeFile("data.json", JSON.stringify(data, null, 2 ), function(err){
        if (err) return res.send("Erro ao gravar dados!")

        return res.redirect(`/students/${id}`)
    })

}


//GET exibir
exports.show = function(req,res){

    const {id} = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("Estudante não encontrado!")

    const student = {
        ...foundStudent,
        data_nascimento: date(foundStudent.data_nascimento).birthDay,
        ano_escolar: grade(foundStudent.ano_escolar)
    }

    return res.render("students/show", { student })


}


//GET editar
exports.edit = function(req,res){

    const { id } = req.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if (!foundStudent) return res.send("Estudante não encontrado!")

    
    const student = {
        ...foundStudent,
        data_nascimento: date(foundStudent.data_nascimento).iso
    }


    return res.render("students/edit", { student })


}


//POST alterar (PUT) 
exports.update = function(req,res){
    const {id} = req.body
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if (student.id == id){
            index = foundIndex
            return true
        }
    })

    if (!foundStudent) return ("Estudante não encontrado!")

    const student = {
        ...foundStudent,
        ...req.body,
        data_nascimento: Date.parse(req.body.data_nascimento),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Erro ao gravar dados!")

        return res.redirect(`/students/${id}`)
    })
}


//POST apagar
exports.delete = function(req,res){
    const {id} = req.body

    const foundStudent = data.students.filter(function(student){
        return student.id != id
    })

    data.students = foundStudent

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send ("Erro ao gravar dados!")

        return res.redirect("/students")
    })
}