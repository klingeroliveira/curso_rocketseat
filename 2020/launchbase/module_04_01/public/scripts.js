const activeMenu = document.querySelectorAll("div.links a");

console.log(activeMenu);

for (let active of activeMenu){
    active.addEventListener('click', function(){
        active.classList.add("active");
        console.log(active.classList);
    })   
}