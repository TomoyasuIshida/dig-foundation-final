"use strict"
// 1行目に記載している "use strict" は削除しないでください

function test(actual, expected) {
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log("OK! Test PASSED.");
    } else {
        console.error("Test FAILED. Try again!");
        console.log("    actual: ", actual);
        console.log("  expected: ", expected);
        console.trace();
    }
}

import * as myMods from "./modules/modules.js";

document.getElementById("container-shop").addEventListener("click", () => {
    myMods.showContainer("container-machine");
});

document.getElementById("container-machine").addEventListener("click", () => {
    myMods.showContainer("container-select");
});

document.getElementById("btn-ticket").addEventListener("click", () => {
    const ticket = myMods.createTicket(myMods.getMenu(menu));

    const aaa = myMods.calcChange(myMods.calcTotal(ticket), document.getElementById("money").value);
    if(myMods.calcChange(myMods.calcTotal(ticket), document.getElementById("money").value)){
        myMods.showContainer("container-order");
    }else{
        myMods.noMoney();
    }
});


document.getElementById("btn-start-coooking").addEventListener("click", () => {
    myMods.showContainer("container-cooking");
});

document.getElementById("container-cooking").addEventListener("click", () => {
    myMods.showContainer("container-serve");
    const ticket = myMods.createTicket(myMods.getMenu(menu));
    const ramenInfo = myMods.getRameninfo(ticket);
    const imgElement = myMods.createImageElement(ramenInfo[1], ramenInfo[0], 300, 300);
    document.getElementById("container-serve").appendChild(imgElement);
});

const menu = await myMods.loadJson("./modules/menu.json");
myMods.setMenu(menu);