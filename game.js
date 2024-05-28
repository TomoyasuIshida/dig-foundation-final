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

// document.getElementById("btn-ticket").addEventListener("click", () => {
//     const ticket = myMods.createTicket(myMods.getMenu(menu));

//     const aaa = myMods.calcChange(myMods.calcTotal(ticket), document.getElementById("money").value);
//     if(myMods.calcChange(myMods.calcTotal(ticket), document.getElementById("money").value)){
//         myMods.showContainer("container-order");
//         let timer = document.getElementById("timer");
//         timer.textContent = "あと60秒で完成だよ！";
//         setInterval(() => {
//             timer.textContent = "あと30秒で完成だよ！";
//         }, 30000);
//         setInterval(() => {
//             timer.textContent = "あと10秒で完成だよ！";
//         }, 20000);

//         myMods.showContainer("container-serve");
//         const ticket = myMods.createTicket(myMods.getMenu(menu));
//         const ramenInfo = myMods.getRameninfo(ticket);
//         const imgElement = myMods.createImageElement(ramenInfo[1], ramenInfo[0], 300, 300);
//         document.getElementById("container-serve").appendChild(imgElement);
//     }else{
//         myMods.noMoney();
//     }
// });

document.getElementById("btn-ticket").addEventListener("click", () => {
    const ticket = myMods.createTicket(myMods.getMenu(menu));
    const total = myMods.calcTotal(ticket);
    const inputMoney = document.getElementById("money").value;

    if (myMods.calcChange(total, inputMoney)) {
        myMods.showContainer("container-order");
    } else {
        myMods.noMoney();
    }
});



document.getElementById("btn-start-coooking").addEventListener("click", () => {
    myMods.showContainer("container-cooking");
    
    let timer = document.getElementById("yugiri-text");
    timer.textContent = "あと60秒で完成だよ！";

    setTimeout(() => {
        timer.textContent = "あと30秒で完成だよ！";
    }, 30000); // 30秒後にテキストを更新

    setTimeout(() => {
        timer.textContent = "あと10秒で完成だよ！";
    }, 50000); // 50秒後にテキストを更新

    setTimeout(() => {
        myMods.showContainer("container-serve");
        const ticket = myMods.createTicket(myMods.getMenu(menu)); // ticket をここで作成
        const ramenInfo = myMods.getRameninfo(ticket);
        const imgElement = myMods.createImageElement(ramenInfo[1], ramenInfo[0], 300, 300);
        document.getElementById("container-serve").appendChild(imgElement);
    }, 60000); // 60秒後にラーメンを提供

});


document.getElementById("serveRamen").addEventListener("click", () => {
    console.log("まてまてっ！");
});
// document.getElementById("serveRamen").addEventListener("click", () => {
//     let timer = document.getElementById("yugiri-text");
//     timer.textContent = "あと60秒で完成だよ！";

//     setTimeout(() => {
//         timer.textContent = "あと30秒で完成だよ！";
//     }, 300000);

//     setTimeout(() => {
//         timer.textContent = "あと10秒で完成だよ！";
//     }, 100000);

//     setTimeout(() => {
//         myMods.showContainer("container-serve");
//         const ramenInfo = myMods.getRameninfo(ticket);
//         const imgElement = myMods.createImageElement(ramenInfo[1], ramenInfo[0], 300, 300);
//         document.getElementById("container-serve").appendChild(imgElement);
//     }, 10000);

//     // myMods.showContainer("container-serve");
//     // const ticket = myMods.createTicket(myMods.getMenu(menu));
//     // const ramenInfo = myMods.getRameninfo(ticket);
//     // const imgElement = myMods.createImageElement(ramenInfo[1], ramenInfo[0], 300, 300);
//     // document.getElementById("container-serve").appendChild(imgElement);
// });

const menu = await myMods.loadJson("./modules/menu.json");
myMods.setMenu(menu);