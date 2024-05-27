'use strict'
// 1行目に記載している 'use strict' は削除しないでください
import * as myMods from "./modules/modules.js";


document.getElementById('container-shop').addEventListener('click', () => {
    myMods.showContainer('container-machine');
});

document.getElementById('container-machine').addEventListener('click', () => {
    myMods.showContainer('container-select');
});

document.getElementById('btn-ticket').addEventListener('click', () => {
    console.log(menu);
    
    const ticket = myMods.createTicket(myMods.getMenu(menu));
    console.log(ticket);
    // colsole.log(myMods.calcTotal(ticket));
    if(!myMods.calcChange(myMods.calcTotal(ticket))){
        myMods.showContainer("container-order");
    }
    // myMods.showContainer('container-order');
});

document.getElementById('btn-start-coooking').addEventListener('click', () => {
    myMods.showContainer('container-cooking');
});

document.getElementById('container-cooking').addEventListener('click', () => {
    myMods.showContainer('container-serve');
    const ticket = myMods.createTicket(myMods.getMenu(menu));
    const ramenInfo = myMods.getRameninfo(ticket);
    const imgElement = myMods.createImageElement(ramenInfo[1], ramenInfo[0], 300, 300);
    document.getElementById('container-serve').appendChild(imgElement);
});

const menu = await myMods.loadJson('./modules/menu.json');
myMods.setMenu(menu);


// const containerShop = document.getElementById("container-shop");
// containerShop.addEventListener("click", myMods.showContainer("container-machine"));

// const containerMachine = document.getElementById("container-machine");
// containerMachine.addEventListener("click", myMods.showContainer("container-select"));

// const btnSelect = document.getElementById("btn-ticket");
// btnSelect.addEventListener("click", myMods.showContainer("container-order"));

// const containerOrder = document.getElementById("container-order");
// containerOrder.addEventListener("click", myMods.showContainer("container-cooking"));

// const containerCooking = document.getElementById("container-cooking");
// containerCooking.addEventListener("click", myMods.showContainer("container-serve"));


// const btnElement = document.getElementsByTagName("button")[0];
// btnElement.addEventListener("click",btnClick);
// btnElement.addEventListener("click",btnClick);