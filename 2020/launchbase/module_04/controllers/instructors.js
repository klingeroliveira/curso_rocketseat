
const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const Intl = require('intl')

exports.index = function(req,res){
    return res.render("./instructors/index", {instructors: data.instructors})
}

exports.create = function(req,res){
    return res.render("./instructors/create")
}

exports.post = function(req,res){

    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == "")
            return res.send("Preencha todos os campos.")
    }

    let id = 1
    const lastMember = data.instructors[ data.instructors.length - 1]

    if (lastMember) {id = lastMember.id + 1}

    const created_at = Date.now()
    birth = Date.parse(req.body.birth)
    
    data.instructors.push({
        ...req.body,
        id,
        birth,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Falha ao gravar o arquivo!")

        return res.redirect(`./instructors/${id}`)
    })

   // return res.send(req.body)
}

exports.show = function(req,res){

    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    return res.render('./instructors/show', { instructor })
}

exports.edit = function(req,res){

    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render("./instructors/edit", { instructor })
}

exports.put = function(req,res){
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if (instructor.id == id){
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Falha ao gravar arquivo!")

        return res.redirect(`./instructors/${id}`)
    })

}

exports.delete = function(req,res){
    const { id } = req.body

    const foundInstructor = data.instructors.filter(function(instructor){
        return instructor.id != id
    })

    data.instructors = foundInstructor

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Falha ao gravar o arquivo!")

        return res.redirect("./instructors")
    })
}