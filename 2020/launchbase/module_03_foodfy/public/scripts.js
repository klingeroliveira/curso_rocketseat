const cards = document.querySelectorAll('.card');
const expandDetails = document.querySelectorAll('a.expandDetails');


for (let card of cards) {
    card.addEventListener("click", function () {
        const idCard = card.getAttribute("id");
        window.location.href = `/recipes/${idCard}`;
    })
}

for (let expand of expandDetails) {
    expand.addEventListener("click", function () {
        if (expand.getAttribute('name').toString = "preparation") {
            const preparation = document.querySelector('.recipe_info_preparation');
            console.log(expand.textContent);
            hidden(expand,preparation);
        }
    })
}

function hidden(expand, preparation){
    if (expand.textContent = "ESCONDER"){
        preparation.setAttribute('hidden', true);
        expand.textContent = "MOSTRAR";
     }else {
         preparation.removeAttribute('hidden');
         expand.textContent = "ESCONDER";
     }
}