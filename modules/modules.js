"use strict"

// 指定コンテナを表示させる
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
// jsonを読み込む
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
 * 
 * @param {string} id htmlタグのid要素
 * @param {object} menu メニュー
 * @returns 指定id要素で選択されているメニューからメニュー名と価格を返す
 */
// return: {keyName:price}のオブジェクトを作成し返す
export function returnNamePriceObj(id, menu) {
  const retObj = {};
  const value = document.getElementById(id).value;

  if (value !== "選択してください") {
    retObj[value] = menu[value].price;
  }
  return retObj;
}

/**
 * 
 * @param {Array} menu 各メニュー表で構成された配列[objRamen, objSize...]
 * @returns 選択内容に応じた食券発行。オブジェクトで返す。ex.{みそラーメン":850, "普通":0}
 */
// objs = objRamenType,
// id:ramenType, size, topping1, topping2, topping3
// 食券発行
export function createTicket(menu) {
  const arrItems = ["ramenType", "size"];
  const arrToppings = ["topping1", "topping2", "topping3"];
  const ticket = {};

  // console.log("ramenType: " + document.getElementById("ramenType").value);
  // for(const val of arrItems){
  //   console.log("value: " + document.getElementById(val).value);
  // }

  // ra-men
  Object.assign(ticket, returnNamePriceObj(arrItems, menu.ramenTypes))
  console.log("aaaaaaaaaaa");
  // size
  // ラーメン種類とサイズのticket作成
  for (let i = 0; i < 2; i++) {
    for(const val of arrItems){
      console.log("value: " + arrItems[i]);
      console.log("arr: " + menu[i][arrItems[i]]);
    }
    // namePrice = ["みそらーめん", 850]
    Object.assign(ticket, returnNamePriceObj(arrItems[i], menu[i][arrItems[i]]));
  }
  // トッピングをticketに追加
  for (const topping of arrToppings) {
    const selectedValue = document.getElementById(topping).value;
    if (selectedValue !== "選択してください") {
      Object.assign(ticket, returnNamePriceObj(topping, menu[3]));
    }
  }
  // ticket = {"みそラーメン":111, "普通":111, "のり":222}
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
    total = ticket + ticket[element].price;
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
  const ret = inputMoney - total;
  if (ret < 0) {
    return false;
  }
  return ret;
}


/**
 * 
 * @param {object} ticket ticketObject
 * @returns [ramenType][ramenSize][]topping]...の配列にして整列し返す
 */
export function objToArr(ticket) {
  // const arr =  Object.entries(ticket);
  const arr = [];

  for (const element of Object.entries(ticket)) {
    for (const value of element) {
      let i = 3; // トッピング用カウンタ
      if (value.includes("ラーメン")) {
        arr[0] = element;
      } else if (value.includes("普通") || value.includes("大盛り")) {
        arr[1] = element;
      } else {
        arr[i] = element;
        i++;
      }
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
    ramenInfo = ["ラーメン", "./img/ramen.img"];
  } else if (ramen === "みそラーメン") {
    ramenInfo = ["みそラーメン", "./img/ramen_miso.img"];
  } else {
    rameninfo = ["地獄ラーメン", "./img/ramen.img"];
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
// 画像要素を生成
export function createImageElement(src, alt, width, height) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.width = width;
  img.height = height;
  return img;
}

// メニューを選択メニューにセットする
// export function populateMenu(data) {
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