const programador = {
    nome: 'Klinger',
    idade: 36,
    tecnologias: [
        {nome: 'C++', especialidade: 'Desktop'},
        {nome: 'Python', especialidade: 'Data Science'},
        {nome: 'JavaScript', especialidade: 'Web/Mobile'}
    ]
}

console.log(`O usuário ${programador.nome} tem ${programador.idade} anos e usa a tencnologia ${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[0].especialidade}`)