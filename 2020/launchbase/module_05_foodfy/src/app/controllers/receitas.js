const fs = require('fs')
const data = require('../../config/data.json')


exports.index = function (req,res){
    return res.render("admin/recipes/index", { items: data.receitas } )
}

exports.create = function (req,res){
    return res.render("admin/recipes/create")
}

exports.post = function (req,res) {

    let id = 1
    const ultimaReceita = data.receitas[ data.receitas.length - 1 ]

    if (ultimaReceita) { id = ultimaReceita.id + 1 }

    data.receitas.push({
        id,
        ...req.body
    })

    fs.writeFile("src/config/data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send(`Erro ao gravar registro! ${err}`)

        //return res.send(req.body)
        return res.redirect("/admin/recipes")
    })
}

exports.show = function (req, res) {
    const {id} = req.params

    const localizarReceita = data.receitas.find( function(receita){
        return receita.id == id
    })
  
    if (!localizarReceita) return res.render("not-found")
    
    return res.render("admin/recipes/show", {item: localizarReceita} )
}

exports.edit = function (req, res) {
    const {id} = req.params

    const localizarReceita = data.receitas.find( function(receita){
        return receita.id == id
    })

    if (!localizarReceita) return res.render("not-found")

    return res.render("admin/recipes/edit", {item: localizarReceita} )
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

    fs.writeFile("src/config/data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send(`Erro ao alterar registro! ${err}`)

        return res.redirect(`/admin/recipes/${id}`)
    })
}

exports.delete = function (req,res) {
    const {id} = req.body

    const localizarReceita = data.receitas.filter(function(receita){
        return receita.id != id
    })

    data.receitas = localizarReceita

    fs.writeFile("src/config/data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send(`Erro apagar registro! ${err}`)

        return res.redirect("/admin/recipes")
    })
}