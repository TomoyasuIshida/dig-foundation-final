"use strict"

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

export function showContainer(elementId) {
  const arrContainers = [
    "container-shop",
    "container-machine",
    "container-select",
    "container-order",
    "container-cooking",
    "container-serve"
  ];
  for (const container of arrContainers) {
    document.getElementById(container).classList.add("hidden");
  }
  document.getElementById(elementId).classList.remove("hidden");
}

/**
 * 
 * @param {string} url jsonファイルのパス 
 * @returns 指定されたJSONファイルを読み込み返す
 */
export async function loadJson(url) {
  const response = await fetch(url);
  return response.json();
}

/**
 * 
 * @param {json} data jsonデータ
 * @param {string} key jsonのキーネーム
 * @returns 指定keyのnameとpriceをオブジェクト{name:price}で返す
 */
export function convertJsonToObj(data, key) {
  const retObj = {};
  for (const element of data[key]) {
    retObj[element.name] = element.price;
  }
  return retObj;
}

/**
 * 
 * @param {json} data json
 * @returns json各メニューobjを配列で返す
 */
export function getMenu(data) {
  const objRamenType = convertJsonToObj(data, "ramenTypes");
  const objSize = convertJsonToObj(data, "size");
  const objToppings = convertJsonToObj(data, "toppings");

  return [objRamenType, objSize, objToppings];
}

/**
 * 指定id要素で選択されているメニューからメニュー名と価格を返す
 * @param {string} id HTMLタグのid要素
 * @param {object} menu メニュー
 * @returns {object} { keyName: price }のオブジェクトを作成し返す
 */
export function returnNamePriceObj(id, menu) {
  const value = document.getElementById(id).value;
  const price = menu[value];
  if (value !== "選択してください") {
    return { [value]: price };
  }
  return {};
}

/**
 * 指定したidのHTML要素が持つvalueに対応する価格を取得する
 * @param {string} id HTMLタグのid要素
 * @param {object} menu メニューオブジェクト
 * @returns {number|null} 価格、該当する値がない場合はnull
 */
export function getPrice(id, menu) {
  const element = document.getElementById(id);
  const value = element.value;

  for (const obj of menu) {
    if(Number(obj[value])){
      return obj[value];
    }
  }

  return 0;
}

/**
 * 
 * @param {Array} menu 各メニュー表で構成された配列[objRamen, objSize...]
 * @returns 選択内容に応じた食券発行。オブジェクトで返す。ex.{みそラーメン":850, "普通":0}
 */
export function createTicket(menu) {
  const arrIds = ["ramenType", "size"];
  const arrToppings = ["topping1", "topping2", "topping3"];
  const ticket = {};

  for (const id of arrIds) {
    const selectedValue = document.getElementById(id).value;
    const price = getPrice(id, menu);

    if (price !== null) {
      ticket[selectedValue] = price;
    }
  }

  for (const id of arrToppings) {
    const selectedValue = document.getElementById(id).value;
    const price = getPrice(id, menu);

    if (price !== null) {
      ticket[selectedValue] = price;
    }
  }

  return ticket;
}

/**
 * 
 * @param {Array} ticket 関数createTicketで発行されたticket
 * @returns 選択された注文の合計金額を計算しnumberで返す
 */
export function calcTotal(ticket) {
  let total = 0;
  for (const element in ticket) {
    total = total + ticket[element];
  }
  return total;
}

/**
 * 
 * @param {number} total 関数calcTotal
 * @param {number} inputMoney ユーザーが入力した金額
 * @returns 計算結果がマイナスならfalse、そうでなければお釣りnumberを返す
 */
export function calcChange(total, inputMoney) {
  if(!Number(inputMoney)){
    inputMoney = 0;
  }

  const ret = inputMoney - total;
  if (ret < 0) {
    return false;
  }
  return ret;
}

export function noMoney() {
  const container = document.createElement("div");
  container.textContent = "冷やかしは帰んな！";
  container.classList.add("go-home");

  document.body.innerHTML = "";
  document.body.appendChild(container);

  setTimeout(() => {
    location.reload();
  }, 5000);
}

/**
 * 
 * @param {object} ticket ticketObject
 * @returns [ramenType][ramenSize][]topping]...の配列にして整列し返す
 */
export function objToArr(ticket) {
  const arr = [];

  let toppingIndex = 2;

  for (const [key, value] of Object.entries(ticket)) {
    if (key.includes("ラーメン")) {
      arr[0] = [key, value];
    } else if (key.includes("普通") || key.includes("大盛り")) {
      arr[1] = [key, value];
    } else {
      arr[toppingIndex] = [key, value];
      toppingIndex++;
    }
  }

  return arr;
}

/**
 * 
 * @param {object} ticket 関数createTicketで発行された食券
 * @returns ラーメン名とファイルpathの配列を返す
 */
export function getRameninfo(ticket) {
  const ramen = objToArr(ticket)[0][0];
  let ramenInfo = [];

  if (ramen === "ラーメン") {
    ramenInfo = ["ラーメン", "./img/ramen.png"];
  } else if (ramen === "みそラーメン") {
    ramenInfo = ["みそラーメン", "./img/ramen_miso.png"];
  } else {
    ramenInfo = ["地獄ラーメン", "./img/ramen_taiwan.png"];
  }
  return ramenInfo;
}

/**
 * 
 * @param {string} src imgのパス 
 * @param {string} alt imgの代替テキスト
 * @param {int} width 幅
 * @param {int} height 高さ
 * @returns img要素を生成し、返す
 */
export function createImageElement(src, alt, width, height) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;
  return img;
}

export function setMenu(data) {
  const ramenTypeSelect = document.getElementById("ramenType");
  const sizeSelect = document.getElementById("size");
  const topping1Select = document.getElementById("topping1");
  const topping2Select = document.getElementById("topping2");
  const topping3Select = document.getElementById("topping3");

  
  for (const item of data.ramenTypes) {
    const option = document.createElement("option");
    option.textContent = `${item.name} - ${item.price}円`;
    option.value = item.name;
    ramenTypeSelect.appendChild(option);
  }

  for (const item of data.size) {
    const option = document.createElement("option");
    option.textContent = `${item.name} - ${item.price}円`;
    option.value = item.name;
    sizeSelect.appendChild(option);
  }

  const toppingSelects = [topping1Select, topping2Select, topping3Select];

  for (const toppingSelect of toppingSelects) {
    for (const item of data.toppings) {
      const option = document.createElement("option");
      option.textContent = `${item.name} - ${item.price}円`;
      option.value = item.name;
      toppingSelect.appendChild(option);
    }
  }
}