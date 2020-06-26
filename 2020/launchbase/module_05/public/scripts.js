const currentPage = location.pathname
const menuItens = document.querySelectorAll("header .links a")


for (item of menuItens) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

/*Paginação*/

let totalPages = 20,
    selectedPage = 16,
    pages = [],
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

        if(oldPage && currentPage - oldPage == numPageDisplay && numPageDisplay != 1){
            pages.push(oldPage + 1)
        }

        pages.push(currentPage)

        oldPage = currentPage
    }
    
}

console.log(pages)