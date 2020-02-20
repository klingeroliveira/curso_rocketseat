const modalOverlay = document.querySelector('.modal_overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards){
    card.addEventListener("click", function(){
        const modalImg = card.getAttribute("id");
        const pCardContent = card.querySelector(".p_card_content");
        const pCardInfo = card.querySelector(".p_card_info");

        modalOverlay.classList.add('active');
        modalOverlay.querySelector("img").src = `images/${modalImg}`;
        document.getElementById('p_modal_card_content').innerHTML = pCardContent.innerHTML;
        document.getElementById('p_modal_card_info').innerHTML = pCardInfo.innerHTML;

    })
}

document.querySelector('.modal_close').addEventListener("click", function(){
    modalOverlay.classList.remove("active");
    modalOverlay.querySelector("img").src = "";
    document.getElementById('p_modal_card_content').innerHTML = "";
    document.getElementById('p_modal_card_info').innerHTML = "";
})