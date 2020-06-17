
const { date, blood } = require('../../lib/utils')
const Members = require('../models/members')

module.exports = {

    index(req,res){
        Members.all(function(members){
            return res.render("members/index", { members })
        })
    },

    create(req,res){
        return res.render("./members/create")
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

            return res.render("members/edit", { member })
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