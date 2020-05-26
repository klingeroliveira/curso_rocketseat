const fs = require('fs')
const data = require('../data.json')


exports.index = function (req,res){
    return res.render("admin/index")
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
        return res.redirect(`/admin/receitas/${id}`)
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
