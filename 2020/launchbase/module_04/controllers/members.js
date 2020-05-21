
const fs = require('fs')
const data = require('../data.json')
const { age, date, blood } = require('../utils')
const Intl = require('intl')

exports.index = function(req,res){
    return res.render("members/index", {members: data.members})
}


exports.create = function(req,res){
    return res.render("members/create")
}


exports.post = function(req,res){

    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == "")
            return res.send("Preencha todos os campos.")
    }

    let id = 1
    const lastMember = data.members[ data.members.length - 1 ]

    if (lastMember){
        id = lastMember.id + 1
    }

    const created_at = Date.now()
    birth = Date.parse(req.body.birth)
    
    data.members.push({
        ...req.body,
        id, 
        birth,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Falha ao gravar o arquivo!")

        return res.redirect(`/members/${id}`)
    })

}


exports.show = function(req,res){

    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundMember.created_at),
        blood: blood(foundMember.blood)
    }

    return res.render('members/show', { member })
}


exports.edit = function(req,res){

    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return member.id == id
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render("members/edit", { member })
}


exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if (member.id == id){
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Falha ao gravar arquivo!")

        return res.redirect(`/members/${id}`)
    })

}


exports.delete = function(req,res){
    const { id } = req.body

    const foundMember = data.members.filter(function(member){
        return member.id != id
    })

    data.members = foundMember

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Falha ao gravar o arquivo!")

        return res.redirect("/members")
    })
}