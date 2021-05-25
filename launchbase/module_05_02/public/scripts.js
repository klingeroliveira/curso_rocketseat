const paginaAtual = location.pathname
const menuItens = document.querySelectorAll("header .links a")

for (const item of menuItens) {
    if (paginaAtual.includes( item.getAttribute("href"))){
        item.classList.add("active")
    }   
}