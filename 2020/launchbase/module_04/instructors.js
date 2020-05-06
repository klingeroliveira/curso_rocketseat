
const fs = require('fs')
const data = require('./data.json')
//create
exports.post = function(req,res){

    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == "")
            return res.send("Preencha todos os campos.")
    }

    let { avartar_url, name, birth, gender, services} = req.body

    const id = Number(data.instructors.length + 1)
    const created_at = Date.now()

    birth = Date.parse(birth)
    
    data.instructors.push( {id, avartar_url, name, birth, gender, services, created_at} )

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Falha ao gravar o arquivo!")

        return res.redirect('/instructors')
    })

   // return res.send(req.body)
}