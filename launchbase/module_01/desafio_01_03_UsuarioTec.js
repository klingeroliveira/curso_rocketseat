const usuarios = [
    {nome: 'Carlos', tecnologias: ['HTML', 'CSS']},
    {nome: 'Igor', tecnologias: ['JavaScript', 'CSS']},
    {nome: 'Rodrigo', tecnologias: ['HTML', 'Node.js']},
    {nome: 'Wallace', tecnologias: ['CSS', 'ReactNative', 'Node.js']}
]

// pesquisa usuário por tecnologia
function checaUsuarioUsaCSS(usuario){
    let trabalhaComCSS = false
    for (let i = 0; i < usuarios[usuario].tecnologias.length; i++) {
        if (usuarios[usuario].tecnologias[i] == 'CSS'){
            trabalhaComCSS = true
            return trabalhaComCSS
        }
    }
    return trabalhaComCSS
}

// lista usuários e suas tecnologias
for (let i = 0; i < usuarios.length; i++) {
    console.log(`O usuário ${usuarios[i].nome} trabalha com ${usuarios[i].tecnologias}`)
}

// lista apenas usuários que trabalham com CSS
for (let i = 0; i < usuarios.length; i++) {
    const usuarioTrabalhaComCSS = checaUsuarioUsaCSS(i)

    if (usuarioTrabalhaComCSS){
        console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`)
    }
}
