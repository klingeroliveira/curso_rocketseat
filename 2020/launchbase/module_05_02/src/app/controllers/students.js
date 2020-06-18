const Students = require("../models/students")
const { age, dateFormat, grade } = require('../../lib/utils')


module.exports = {

    //GET listar
    index(req, res){
        Students.all(function(students){

            let listStudents = students.map( student => {

                const newStudent = {
                    ...student,
                    ano_escolar: grade(student.ano_escolar)
                }

                return newStudent

            })

            return res.render("students/index", {students : listStudents})
        })
    },


    //GET criar
    create(req, res){

        return res.render("students/create")
    },

    //POST salvar
    post(req, res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Preencha todos os campos!")
            }
        }

        Students.create(req.body, function(id){
            return res.redirect(`students/${id}`)
        })
    },


    //GET exibir
    show(req,res){

        Students.find(req.params.id, function(student){
            if (!student) res.send("Estudante não encontrado!")

            student.data_nascimento = age(student.data_nascimento)
            student.ano_escolar = grade(student.ano_escolar)

            return res.render("students/show", { student })
        })
    },


    //GET editar
    edit(req,res){

        Students.find(req.params.id,function(student){
            if (!student) return res.send("Estudante não encontrado!")

            student.data_nascimento = dateFormat(student.data_nascimento).iso

            return res.render("students/edit", {student})
        })
    },


    //POST alterar (PUT) 
    update(req,res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Preencha todos os campos!")
            }
        }

        Students.update(req.body,function(){
            return res.redirect(`students/${req.body.id}`)
        })
    },


    //POST apagar
    delete(req,res){
        
        Students.delete(req.body.id, function(){
            return res.redirect("students")
        })
    }
    
}