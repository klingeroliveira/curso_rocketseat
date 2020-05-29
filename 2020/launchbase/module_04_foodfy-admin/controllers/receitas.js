const fs = require('fs')
const data = require('../data.json')


exports.index = function (req,res){
    return res.render("admin/index", { items: data.receitas } )
}

exports.create = function (req,res){
    return res.render("admin/create")
}

exports.post = function (req,res) {

    let id = 1
    const ultimaReceita = data.receitas[ data.receitas.length - 1 ]

    if (ultimaReceita) { id = ultimaReceita.id + 1 }

    data.receitas.push({
        id,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Erro ao gravar dados!")

        //return res.send(req.body)
        return res.redirect("/admin/receitas")
    })
}

exports.show = function (req, res) {
    const {id} = req.params

    const localizarReceita = data.receitas.find( function(receita){
        return receita.id == id
    })
  
    if (!localizarReceita) return res.render("not-found")
    
    return res.render("admin/show", {item: localizarReceita} )
}

exports.edit = function (req, res) {
    const {id} = req.params

    const localizarReceita = data.receitas.find( function(receita){
        return receita.id == id
    })

    if (!localizarReceita) return res.render("not-found")

    return res.render("admin/edit", {item: localizarReceita} )
}

exports.update = function (req,res) {
    const {id} = req.body
    let index = 0

    const localizarReceita = data.receitas.find( function(receita, localizarIndex) {
        if ( receita.id == id) {
            index = localizarIndex
            return true
        }
    })

    if (!localizarReceita) return ("Receita não encontrada!")

    const receita = {
        ...localizarReceita,
        ...req.body,
        id: Number(req.body.id)
    }

    data.receitas[index] = receita

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Erro ao gravar dados!")

        return res.redirect(`/admin/receitas/${id}`)
    })
}

exports.delete = function (req,res) {
    const {id} = req.body

    const localizarReceita = data.receitas.filter(function(receita){
        return receita.id != id
    })

    data.receitas = localizarReceita

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Erro ao gravar arquivo!")

        return res.redirect("/admin/receitas")
    })
}