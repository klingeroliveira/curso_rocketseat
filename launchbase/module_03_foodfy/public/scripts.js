const cards = document.querySelectorAll('.card');
const detailsRecipe = document.querySelectorAll('a.expandDetails');


for (let card of cards) {
    card.addEventListener("click", function () {
        const idCard = card.getAttribute("id");
        window.location.href = `/recipes/${idCard}`;
    })
}

for (let detailRecipe of detailsRecipe) {
    detailRecipe.addEventListener("click", function () {

        if (detailRecipe.getAttribute('name') == "top_ingredients") {
            const ingredients = document.querySelector('div[name=ingredients]');
            hidden(detailRecipe,ingredients);
        } else if (detailRecipe.getAttribute('name') == "top_preparation") {
            const preparation = document.querySelector('div[name=preparation]');
            hidden(detailRecipe,preparation);
        } else if (detailRecipe.getAttribute('name') == "top_information") {
            const information = document.querySelector('div[name=information]');
            hidden(detailRecipe,information);
        }
    })
}

function hidden(name,content){
    if (name.textContent == "MOSTRAR"){
        content.removeAttribute('hidden');
        name.textContent = "ESCONDER";
    } else {
        content.setAttribute('hidden',true);
        name.textContent = "MOSTRAR";
    }
}