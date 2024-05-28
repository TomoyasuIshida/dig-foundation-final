'use strict'
// 1行目に記載している 'use strict' は削除しないでください

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
  // document.getElementById(elementId).classList.add("visible");
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
 * @returns json各メニューをオブジェクトで返す
 */
export function getMenu(data) {
  const objRamenType = convertJsonToObj(data, 'ramenTypes');
  const objSize = convertJsonToObj(data, 'size');
  const objToppings = convertJsonToObj(data, 'toppings');
  
  return { objRamenType, objSize, objToppings };
}

/**
 * 
 * @param {string} id htmlタグのid要素
 * @param {object} menu メニュー
 * @returns 指定id要素で選択されているメニューからメニュー名と価格を返す
 */
// return: {keyName:price}のオブジェクトを作成し返す
export function returnNamePriceObj(id, menu){
  const retObj = {};
  const value = document.getElementById(id).value;
  
  if(value !== "選択してください"){
    retObj[value] = menu[value];
  }
  return retObj;
}

/**
 * 
 * @param {Array} arrObjs 各メニュー表で構成された配列[objRamen, objSize...]
 * @returns 選択内容に応じた食券発行。オブジェクトで返す。ex.{みそラーメン":850, "普通":0}
 */
// objs = objRamenType,
// id:ramenType, size, topping1, topping2, topping3
// 食券発行
export function createTicket(arrObjs) {
  const [objRamenType, objSize, objToppings] = arrObjs;
  const ticket = { ...returnNamePriceObj("ramenType", objRamenType), ...returnNamePriceObj("size", objSize) };
  const toppings = { ...returnNamePriceObj("topping1", objToppings), ...returnNamePriceObj("topping2", objToppings), ...returnNamePriceObj("topping3", objToppings) };
  
  for (const key in toppings) {
    if (ticket.hasOwnProperty(key)) {
      ticket[key] += toppings[key];
    } else {
      ticket[key] = toppings[key];
    }
  }
  
  return ticket;
}

/**
 * 
 * @param {object} ticket 発行された食券
 * @returns [ラーメンの種類, ramen.png]を配列で返す
 */
export function getRameninfo(ticket) {
  for (const key in ticket) {
    if (key.includes("ラーメン")) {
      return [key, "ramen.png"];
    }
  }
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
export function populateMenu(data) {
  const ramenTypeSelect = document.getElementById("ramenType");
  const topping1Select = document.getElementById("topping1");
  const topping2Select = document.getElementById("topping2");
  const topping3Select = document.getElementById("topping3");
  
  data.ramenTypes.forEach(item => {
    const option = document.createElement("option");
    option.textContent = `${item.name} - ${item.price}円`;
    option.value = item.name;
    ramenTypeSelect.appendChild(option);
  });
  
  data.toppings.forEach(item => {
    const option1 = document.createElement("option");
    option1.textContent = `${item.name} - ${item.price}円`;
    option1.value = item.name;
    topping1Select.appendChild(option1);
    
    const option2 = document.createElement("option");
    option2.textContent = `${item.name} - ${item.price}円`;
    option2.value = item.name;
    topping2Select.appendChild(option2);
    
    const option3 = document.createElement("option");
    option3.textContent = `${item.name} - ${item.price}円`;
    option3.value = item.name;
    topping3Select.appendChild(option3);
  });
}
