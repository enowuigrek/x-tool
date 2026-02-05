'use strict';

//Inputs
const inputSku = document.getElementById('input_sku');
const inputMessage = document.getElementById('input_links');
const inputOrderNumber = document.getElementById('input_order_number');

//Buttons
const skuListButton = document.getElementById('sku_list_button');
const skuLinkButton = document.getElementById('sku_link_button');
const skuListFromMessageButton = document.getElementById(
  'sku_list_from_message_button'
);
const skuLinkFromMessageButton = document.getElementById(
  'sku_link_from_message_button'
);
const orderLinkButton = document.getElementById('order_link_button');

const clearButton = document.querySelector('.clear_button');

//Results
const displaySkuFromInput = document.querySelector('.sku_from_input');
const displaySkuFromMessage = document.querySelector('.sku_from_message');
const displayOrderLink = document.querySelector('.order_link');

let listSkuArr = [];
let resultList = '';
let resultLink = '';

const clearlistSku = () => {
  resultList = '';
  resultLink = '';
  listSkuArr.length = 0;
};
const delateDuplicateAndUndefined = () => {
  listSkuArr = [...new Set(listSkuArr)];

  if (listSkuArr.indexOf(undefined) != -1) {
    listSkuArr.splice(listSkuArr.indexOf(undefined), 1);
  }
};
const checkSku = (sku) => {
  //remove zero
  sku = Number(sku);
  sku = String(sku);
  //ad zero if length is 7
  if (sku.length >= 4 && sku.length <= 6) {
    return sku;
  } else if (sku.length == 7) {
    return '00' + sku;
  }
};

//Array with sku generators
const generateInputlistSkuArr = (input) => {
  const splitInputText = input.split(/\r?\n/);

  for (let pieceOfInputText of splitInputText) {
    pieceOfInputText = checkSku(pieceOfInputText);
    listSkuArr.push(pieceOfInputText);
  }
};
const generateSkuFromMessageArr = (input) => {
  const splitInputText = input.replace(/^\s+|\s+$/g, '').split(/\s+/);

  const extractorSkuFromLink = (xKomLink) => {
    const skuFromLink = new RegExp(/\/p\/(\d*)/);
    let skuFromInputLink = skuFromLink.exec(xKomLink)[1];
    skuFromInputLink = checkSku(skuFromInputLink);
    listSkuArr.push(skuFromInputLink);
  };

  const extractorSkuFromText = (beforeSku) => {
    const foundIndex = splitInputText.indexOf(beforeSku);
    splitInputText[foundIndex] = 'delated';
    let skuFromText = splitInputText[foundIndex + 1];
    skuFromText = checkSku(skuFromText);
    listSkuArr.push(skuFromText);
  };

  for (let pieceOfInputText of splitInputText) {
    if (pieceOfInputText.includes('https://www.x-kom.pl/p/'))
      extractorSkuFromLink(pieceOfInputText);

    if (
      pieceOfInputText === 'x-kom:' ||
      pieceOfInputText === 'xkom:' ||
      pieceOfInputText === 'sku:' ||
      pieceOfInputText === 'sku'
    )
      extractorSkuFromText(pieceOfInputText);
  }
};

//List to copy and link to list generators
const listToCopy = (arr) => {
  for (let sku of arr) {
    sku = `${sku} </br>`;
    resultList += sku;
  }
};
const linkToList = (arr) => {
  const linkBegin = 'href=https://www.x-kom.pl/szukaj?q=';
  let skuToLink = '';

  for (let sku of arr) {
    sku = `${sku}%2B`;
    skuToLink += sku;
  }

  skuToLink = skuToLink.slice(0, -3);

  if (!skuToLink) {
    resultLink = '';
  } else {
    resultLink = `<a ${linkBegin}${skuToLink} target="_blank"> Lista na stronie </a>`;
  }
};

const displaySkuListToCopy = () => {
  clearlistSku();

  generateInputlistSkuArr(inputSku.value);

  delateDuplicateAndUndefined();

  listToCopy(listSkuArr);

  displaySkuFromInput.innerHTML = resultList;
};
const displaySkuListLink = () => {
  clearlistSku();
  generateInputlistSkuArr(inputSku.value);
  delateDuplicateAndUndefined();
  linkToList(listSkuArr);
  displaySkuFromInput.innerHTML = resultLink;
};
const displaySkuListToCopyMessage = () => {
  clearlistSku();
  generateSkuFromMessageArr(inputMessage.value);
  delateDuplicateAndUndefined();
  listToCopy(listSkuArr);
  displaySkuFromMessage.innerHTML = resultList;
};
const displaySkuListLinkMessage = () => {
  clearlistSku();
  generateSkuFromMessageArr(inputMessage.value);
  delateDuplicateAndUndefined();
  linkToList(listSkuArr);
  displaySkuFromMessage.innerHTML = resultLink;
};

const displayOrderLink = () => {
  const linkBeginXKom =
    'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';

  const linkBeginAlTo =
    'https://xkom-prod.operations.dynamics.com/?cmp=alto&mi=display:SalesTableDetails&SalesId=';

  const xKomShop = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

  let linkBegin = '';
  let resultOrderLink = '';
  let orderNumber = inputOrderNumber.value;
  let orderLink = linkBegin + orderNumber;

  orderNumber = orderNumber.trim();

  if (orderNumber.length === 12) {
    if (orderNumber.startsWith(7)) {
      linkBegin = linkBeginXKom;
    } else if (orderNumber.startsWith(6)) {
      linkBegin = linkBeginAlTo;
    } else if (orderNumber.startsWith(9)) {
      linkBegin = xKomShop;
    } else {
      linkBegin = undefined;
    }

    orderLink = linkBegin + orderNumber;

    if (linkBegin == undefined) {
      displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
    } else {
      const hrefOrderLink = `<a href= ${orderLink} target="_blank"> ${orderNumber} </a>`;
      resultOrderLink += hrefOrderLink;
      displayOrderLink.innerHTML = resultOrderLink;
    }
  } else {
    displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
  }
};

skuListButton.addEventListener('click', displaySkuListToCopy);
skuLinkButton.addEventListener('click', displaySkuListLink);
skuListFromMessageButton.addEventListener('click', displaySkuListToCopyMessage);
skuLinkFromMessageButton.addEventListener('click', displaySkuListLinkMessage);
orderLinkButton.addEventListener('click', displayOrderLink);
