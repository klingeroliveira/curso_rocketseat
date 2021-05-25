const nome = 'Sara'
const sexo = 'F'
const idade = 67
const tempContribuicao = 29

const tempContribuicaoIdade = idade + tempContribuicao

if ((sexo == 'F' && tempContribuicao >= 30 && tempContribuicaoIdade >= 85 ) 
    || (sexo == 'M' && tempContribuicao >= 35 && tempContribuicaoIdade >= 95)) {
    console.log(`${nome}, você pode se aposentar!`)
} else {
    console.log(`${nome}, você ainda não pode se aposentar!`)
}