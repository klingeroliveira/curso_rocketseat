const cards = document.querySelectorAll('.card');
const detailsRecipe = document.querySelectorAll('a.expandDetails');
const formEditChef = document.querySelector('#formEditChef');
const formEditRecipe = document.querySelector('#formEditRecipe');
const paginaAtual = location.pathname
const menuItens = document.querySelectorAll("header .menu a")

for (let card of cards) {
    card.addEventListener("click", function () {
        const idCard = card.getAttribute("id");
        console.log(idCard)
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
//******* */


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

const ingrediente =  document.querySelector(".add_ingredientes");
const passoapasso = document.querySelector(".add_passos");

if (ingrediente){
    ingrediente.addEventListener("click", addIngrediente);
}

if (passoapasso){
    passoapasso.addEventListener("click", addPasso);
}
//****** */


//inclusão metodo para form edit e delete
const button_salvar_edit = document.querySelector("button[name=button_salvar_edit]")
const button_delete_edit = document.querySelector("button[name=button_delete_edit]")

if (button_salvar_edit){
    
    button_salvar_edit.addEventListener("click", function(){
        
        if (formEditChef){
        
            formEditChef.setAttribute("action", "/admin/chefs?_method=PUT")
        
        } else if (formEditRecipe){
        
            formEditRecipe.setAttribute("action", "/admin/recipes?_method=PUT")
        }
    })
}

if (button_delete_edit){
    
    button_delete_edit.addEventListener("click", function(){
    
        if (formEditChef){
    
            formEditChef.setAttribute("action", "/admin/chefs?_method=DELETE")
    
        } else if (formEditRecipe){
    
            formEditRecipe.setAttribute("action", "/admin/recipes?_method=DELETE")
        }
        
    })
}
//******* */


//indicar página ativa
for (const item of menuItens) {
    if (paginaAtual.includes( item.getAttribute("href"))){
        item.classList.add("active")
    }   
}
//****** */


//paginação
function paginate(totalPages, selectedPage){

    let pages = [],
    oldePage,
    numPageDisplay = 2

    for (let currentPage = 1; currentPage <= totalPages; currentPage++){

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pageAfterSelectedPage = currentPage <= selectedPage + numPageDisplay
        const pageBeforeSelectedPage = currentPage >= selectedPage - numPageDisplay

        if (firstAndLastPage || pageAfterSelectedPage && pageBeforeSelectedPage){
            
            if(oldePage && currentPage - oldePage > numPageDisplay){
                pages.push("...")
            }

            if ((oldePage && currentPage - oldePage == numPageDisplay) && numPageDisplay != 1){
                pages.push(oldePage + 1)
            }

            pages.push(currentPage)

            oldePage = currentPage
        }
    }

    return pages
}

function createPagination(pagination){
    const filter = pagination.dataset.filter
    const page = pagination.dataset.page
    const total = pagination.dataset.total
    const pages = paginate(total, page)

    let elements = ""

    for(let page of pages){

        if (String(page).includes("...")) {

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
//****** */


//****** FOTOS UPLOAD */
const PhotosUpload = {
    input: "",
    uploadLimit: 6,
    preview: document.querySelector('#photos-preview'),
    files: [],

    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if (PhotosUpload.hasLimit(event)) {
            PhotosUpload.updateInputFiles()
            return
        }
        

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.updateInputFiles()
    },

    hasLimit(event){
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos!`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos!")
            event.preventDefault()
            return true
        }

        return false
    },

    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },

    getContainer(image) {

        const div = document.createElement('div')

        div.classList.add('photo')
        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)
        div.appendChild(PhotosUpload.getRemoveButton())
        
        return div
    },

    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"

        return button
    },

    removePhoto(event){
        const photoDiv = event.target.parentNode //div class="photo"

        const newFiles = Array.from(PhotosUpload.preview.children).filter(function(file) {
            if (file.classList.contains('photo') && !file.getAttribute('id')) return true
        })
        const index = newFiles.indexOf(photoDiv)
        PhotosUpload.files.splice(index, 1)
        
        photoDiv.remove()

        PhotosUpload.updateInputFiles()
        
    },

    removeOldPhoto(event){
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    },

    updateInputFiles(){
        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    }

}
//****** */

const LightBox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),

    open(){
        LightBox.target.style.opacity = 1
        LightBox.target.style.top = 0
        LightBox.target.style.button = 0
        LightBox.closeButton.style.top = 0
    },

    close(){
        LightBox.target.style.opacity = 0
        LightBox.target.style.top = "-100%"
        LightBox.target.style.button = "initial"
        LightBox.closeButton.style.top = "-80px"
    }
}

const ImageGallery = {
    highlight: document.querySelector('.recipe-gallery .highlight > img'),
    previews: document.querySelectorAll('gallery-preview img'),

    setImage(e) {
        const {target} = e

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))

        target.classList.add('active')

        ImageGallery.highlight.src = target.src
        LightBox.image.src = target.src
    }
}