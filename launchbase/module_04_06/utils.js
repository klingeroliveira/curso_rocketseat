module.exports = {
    age: function age(timestamp){
        const dataNascimento = new Date(timestamp)
        const dataAtual = new Date()

        let idade = dataAtual.getUTCFullYear() - dataNascimento.getUTCFullYear()
        const mes = dataAtual.getUTCMonth() - dataNascimento.getUTCMonth()

        if (mes < 0 || mes == 0 && dataAtual.getUTCDate() < dataNascimento.getUTCDate()) 
         idade = idade -1

        return idade
    },

    graduation: function graduation(graduation){

        let grau_escolaridade

        switch (graduation) {
            case "medio": grau_escolaridade = "Ensino Médio Completo"
                break;
            case "superior": grau_escolaridade = "Ensino Superior Completo"
                break;
            case "mestrado": grau_escolaridade = "Mestrado"
                break;
            case "doutorado": grau_escolaridade = "Doutorado"
            default: ""
                break;
        }

        return grau_escolaridade
    },

    date: function date(timestamp){
        const dataNascimento = new Date(timestamp)

        const year = dataNascimento.getUTCFullYear()
        const month = `0${dataNascimento.getUTCMonth()+1}`.slice(-2)
        const day = `0${dataNascimento.getUTCDate()}`.slice(-2)

        return (`${year}-${month}-${day}`)

    }
}