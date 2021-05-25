const Students = require("../models/students")
const { age, dateFormat, grade } = require('../../lib/utils')


module.exports = {

    
    //GET listar
    index(req, res){

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        let offset = limit * (page-1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students){
                const pagination = {
                    total: Math.ceil( +students[0].total / limit),
                    page
                }

                let listStudents = students.map( students => {
                    const ano_escolar = grade(students.ano_escolar)

                    const newStudents = {
                        ...students,
                        ano_escolar: ano_escolar
                    }

                    return newStudents
                })
                    
                return res.render("students/index", { students: listStudents, filter, pagination })
            }
        }

        Students.paginate(params)
        
    },


    //GET criar
    create(req, res){

        Students.selectOptionTeachers(function(teachers){
            return res.render("students/create", {teachers})
        })
        
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

            Students.selectOptionTeachers(function(teachers){
                return res.render("students/edit", { student, teachers })
            })
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