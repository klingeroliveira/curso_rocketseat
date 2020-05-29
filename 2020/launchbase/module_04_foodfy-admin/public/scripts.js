const cards = document.querySelectorAll('.card');
const detailsRecipe = document.querySelectorAll('a.expandDetails');
const formEditRecipe = document.querySelector('#formEditRecipe');

for (let card of cards) {
    card.addEventListener("click", function () {
        const idCard = card.getAttribute("id");
        window.location.href = `/recipes/${idCard}`;
    })
}


// função ocultar/mostrar dados
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
//



// função adicionar campos
function addIngrediente() {
    const ingredientes = document.querySelector("#ingredientes");
    const inputsIngredientes = document.querySelectorAll(".ingrediente");

    const novoInput = inputsIngredientes[inputsIngredientes.length - 1].cloneNode(true);

    if (novoInput.children[0].value == "") return false;

    novoInput.children[0].value = "";
    ingredientes.appendChild(novoInput);
}

function addPasso() {
    const passos = document.querySelector("#passos");
    const inputsPassos = document.querySelectorAll(".passo");

    const novoInput = inputsPassos[inputsPassos.length - 1].cloneNode(true);

    if (novoInput.children[0].value == "") return false;

    novoInput.children[0].value = "";
    passos.appendChild(novoInput);
}

document.querySelector(".add_ingredientes").addEventListener("click", addIngrediente);
document.querySelector(".add_passos").addEventListener("click", addPasso);
//

//inclusão metodo para form edit
document.querySelector("button[name=button_salvar_edit]").addEventListener("click", function(){
    formEditRecipe.setAttribute("action", "/admin/receitas?_method=PUT")
})

document.querySelector("button[name=button_delete_edit]").addEventListener("click", function(){
    formEditRecipe.setAttribute("action", "/admin/receitas?_method=DELETE")
})
//