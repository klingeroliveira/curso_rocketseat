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

    grade: function grade(anoescolar){

        let ano_escolar

        switch (anoescolar) {
            case "6ef": ano_escolar = "6º Ano - Ensino Fundamental II"
                break;
            case "7ef": ano_escolar = "7º Ano - Ensino Fundamental II"
                break;
            case "8ef": ano_escolar = "8º Ano - Ensino Fundamental II"
                break;
            case "9ef": ano_escolar = "9º Ano - Ensino Fundamental II"
                break;
            case "1em": ano_escolar = "1º Ano - Ensino Médio"
                break;
            case "2em": ano_escolar = "2º Ano - Ensino Médio"
                break;
            case "3em": ano_escolar = "3º Ano - Ensino Médio"
                break;
            default: ""
                break;
        }

        return ano_escolar
    },


    dateFormat: function date(timestamp){
        const dataNascimento = new Date(timestamp)

        const year = dataNascimento.getUTCFullYear()
        const month = `0${dataNascimento.getUTCMonth()+1}`.slice(-2)
        const day = `0${dataNascimento.getUTCDate()}`.slice(-2)

        return ({
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            pt_br: `${day}/${month}/${year}` ,
            year, month, day
        })

    }
}