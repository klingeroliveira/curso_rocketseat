
const { date, blood } = require('../../lib/utils')
const Members = require('../models/members')

module.exports = {

    index(req,res){

        let { filter, page, limit } = req.query
        
        page = page || 1
        limit = limit || 3
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(members){
                
                const pagination = {
                    total: Math.ceil( +members[0].total / limit),
                    page                    
                }
                
                return res.render("members/index", { members, pagination, filter })
            }
        }

        Members.paginate(params)
    },

    create(req,res){
        Members.instructorsSelectOption(function(instructors){
            return res.render("./members/create", {instructors})          
        })
    },

    post(req,res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] == "")
                return res.send("Preencha todos os campos.")
        }

        Members.create(req.body, function(member){
            return res.redirect(`members/${member.id}`)
        })
    },

    show(req,res){

        Members.find(req.params.id, function(member){
            if (!member) return res.send("Membro não encontrado!")

            member.birth = date(member.birth).birthDay
            member.blood = blood(member.blood)
            
            return res.render("members/show", { member} )
        })
    },

    edit(req,res){
        Members.find(req.params.id, function(member){
            if (!member) return res.send("Membro não encontrado!")

            member.birth = date(member.birth).iso

            Members.instructorsSelectOption(function(instructors){
                return res.render("members/edit", { member, instructors })
            })
        })
    },

    put(req,res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] == "")
                return res.send("Preencha todos os campos.")
        }

        Members.update(req.body,function(){
            return res.redirect(`members/${req.body.id}`)
        })
    },

    delete(req,res){

        Members.delete(req.body.id, function(){
            return res.redirect("/members")
        })
    }
}