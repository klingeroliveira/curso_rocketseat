const nome = 'Bárbara'
const peso = 95.99
const altura = 1.60

const imc = peso / (altura * 2)


if (imc >= 30 && !(imc < 29.9)) {
    console.log(`${nome} você está acima do peso. IMC: ${imc}`)
} else {
    console.log(`${nome} você não está acima do peso. IMC: ${imc}`)
}