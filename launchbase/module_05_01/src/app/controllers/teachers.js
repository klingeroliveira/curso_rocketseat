const { grade, date } = require('../../lib/utils')


module.exports = {

    //GET listar
    index(req, res){

        return res.render("teachers/index")
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

        return
    },


    //GET exibir
    show(req,res){

        return
    },


    //GET editar
    edit(req,res){

        return
    },


    //POST alterar (PUT) 
    update(req,res){

        const keys = Object.keys(req.body)

        for (key of keys){
            if (req.body[key] == ""){
                return res.send("Preencha todos os campos!")
            }
        }

        return
    },


    //POST apagar
    delete(req,res){
        return
    }
    
}