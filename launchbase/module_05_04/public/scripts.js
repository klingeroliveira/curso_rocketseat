const paginaAtual = location.pathname
const menuItens = document.querySelectorAll("header .links a")

for (const item of menuItens) {
    if (paginaAtual.includes( item.getAttribute("href"))){
        item.classList.add("active")
    }   
}

/*Paginação*/

function paginate(totalPages, selectedPage){

    let pages = [],
    oldPage,
    numPageDisplay = 2

    for (let currentPage = 1; currentPage <= totalPages ; currentPage++){

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pageAfterSelectedPage = currentPage <= selectedPage + numPageDisplay
        const pageBeforeSelectedPage = currentPage >= selectedPage - numPageDisplay

        if(firstAndLastPage || pageAfterSelectedPage && pageBeforeSelectedPage){

            if(oldPage && currentPage - oldPage > numPageDisplay){
                pages.push("...")
            }

            if((oldPage && currentPage - oldPage == numPageDisplay) && numPageDisplay != 1){
                pages.push(oldPage + 1)
            }
            
            pages.push(currentPage)
            
            oldPage = currentPage
        }
        
    }
    
    return pages
}

function createPagination(pagination){
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(total, page)
    
    let elements = ""
    
    for (let page of pages) {
    
        if (String(page).includes("...")){
    
            elements += `<span>${page}</span>`
    
        } else if (filter) {
    
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
    
        } else {
    
            elements += `<a href="?page=${page}">${page}</a>`
           
        }
    
    
    
    }
    
    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)
}