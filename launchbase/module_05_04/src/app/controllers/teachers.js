const Teachers = require("../models/teachers")
const {dateFormat, age, graduation} = require("../../lib/utils")


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
            callback(teachers){
                const pagination = {
                    total: Math.ceil( +teachers[0].total / limit),
                    page
                }

                let listTeachers = teachers.map( teacher => {
                    const areas_atuacao = teacher.areas_atuacao.split(",")
    
                    const newTeacher = {
                        ...teacher,
                        areas_atuacao: areas_atuacao
                    }
    
                    return newTeacher
                })
                    
                return res.render("teachers/index", { teachers: listTeachers, filter, pagination })
            }
        }

        Teachers.paginate(params)
    },


    //GET criar
    create(req, res){

        return res.render("teachers/create")
    },

    //POST salvar
    post(req, res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Preencha todos os campos!")
            }
        }

        Teachers.insert(req.body,function(id){
            return res.redirect(`teachers/${id}`)
        })
    },


    //GET exibir
    show(req,res){

        Teachers.find(req.params.id, function(teacher){

            teacher.data_nascimento = age(teacher.data_nascimento)
            teacher.grau_escolaridade = graduation(teacher.grau_escolaridade)
            teacher.areas_atuacao = teacher.areas_atuacao.split(",")
            teacher.data_cadastro = dateFormat(teacher.data_cadastro).pt_br

            return res.render("teachers/show", {teacher})
        })
    },


    //GET editar
    edit(req,res){

        Teachers.find(req.params.id, function(teacher){
            if (!teacher) return res.send("Teacher não encontrado!")

            teacher.data_nascimento = dateFormat(teacher.data_nascimento).iso

            return res.render("teachers/edit", {teacher})
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

        Teachers.put(req.body, function(){

            return res.redirect(`teachers/${req.body.id}`)
        })
    },


    //POST apagar
    delete(req,res){
        Teachers.delete(req.body.id, function(){
            return res.redirect("/teachers")
        })
    }
    
}