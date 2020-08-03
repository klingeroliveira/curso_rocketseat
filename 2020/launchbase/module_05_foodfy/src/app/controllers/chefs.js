
const Chefs = require('../models/chefs')

module.exports = {

    index(req, res){
        Chefs.all(function(chefs){
            return res.render("admin/chefs/index", { items: chefs })
        })
        
    },

    create(req,res){

        return res.render("admin/chefs/create")
    
    },

    post(req, res){

        const keys = Object.keys(req.body)
        
        for(key of keys){
            if (req.body[key] == ""){
                return res.send("Preencha todos os campos")
            }
        }

        Chefs.create(req.body, function(id){
            
            return res.redirect(`/admin/chefs/${id}`)
        })
    },

    show(req,res){
        Chefs.find(req.params.id, function(chef){
            if (!chef) return res.send("Chefe não encontrado!")

            return res.render("admin/chefs/show", {items: chef})
        })
    },

    edit(req,res){
        Chefs.find(req.params.id, function(chef){
            if (!chef) return res.send("Chefe não encontrado!")

            return res.render("admin/chefs/edit", {items: chef})
        })
    },

    put(req,res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if (req.body[key] == "" && key != "button_salvar_edit"){
                return res.send("Preencha todos os campos")
            }
        }

        Chefs.update(req.body, function(){
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },

    delete(req,res){
        Chefs.cheqDelete(req.body.id, function(chef){
            if (chef){
                return res.send("Não é possível deletar, Chef possui receitas!")
            } else {
                Chefs.delete(req.body.id, function(){
                    return res.redirect("/admin/chefs")
                })
            }
        })
    }
}
