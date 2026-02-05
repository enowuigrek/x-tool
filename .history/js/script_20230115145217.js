'use strict';

//INPUTS
const inputSku = document.getElementById('input_sku');
const inputLinks = document.getElementById('input_links');
const inputOrderNumber = document.getElementById('input_order_number');

//BUTTONS
const generateSkuButton = document.getElementById('generate_sku_button');
const generateListButton = document.getElementById('generate_list_button');
const generateSkuFromMessageButton = document.getElementById(
  'generate_sku_from_message_button'
);
const generateLinkFromMessageButton = document.getElementById(
  'generate_link_from_message_button'
);
const generateOrderLinkButton = document.getElementById(
  'generate_order_link_button'
);

//RESULTS
const displaySkuToCopy = document.querySelector('.sku_to_copy');
const displaySkuToCopyFromLinks = document.querySelector(
  '.sku_to_copy_from_links'
);
const displayOrderLink = document.querySelector('.order_link');

const listSku = [];

const clearListSku = () => {
  listSku.length = 0
}
const removeZero = (sku) => {
  sku = Number(sku);
  sku = String(sku);
  return sku;
};
const addZero = (sku) => {
  if (sku.length >= 7) {
    return '00' + sku;
  } else {
    return sku;
  }
};
const checkSku = (sku) => {

  removeZero();

  if (sku.length >= 4 && sku.length <= 6) {
    return sku;
  } else {
    addZero();
  }
  // sku = Number(sku);
  // sku = String(sku);
  // if (sku.length >= 4 && sku.length <= 6) {
  //   return sku;
  // } else if (sku.length == 7) {
  //   return '00' + sku;
  // }
};

const generateListSku = () => {

  const input = inputSku.value;
  const splitInputTextArray = input.split(/\r?\n/);

  for (let pieceOfInputText of splitInputTextArray) {
    pieceOfInputText = removeZero(pieceOfInputText);

    if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {
      listSku.push(pieceOfInputText);
    }
  }

};
const displaySkuListToCopy = () => {

  clearListSku();
  generateListSku();

  let resultSku = '';

  for (let sku of listSku) {
    sku = addZero(sku);
    sku = `${sku} </br>`;
    resultSku += sku;
  }
  displaySkuToCopy.innerHTML = resultSku;
};

const displaySkuListLink = () => {

  clearListSku();
  generateListSku();

  let resultSku = '';
  let skuToLink = '';

  console.log(listSku);

  for (let sku of listSku) {
    sku = addZero(sku);
    sku = `${sku}%2B`;
    skuToLink += sku;
  }

  skuToLink = skuToLink.slice(0, -3);
  resultSku = `<a href=https://www.x-kom.pl/szukaj?q=${skuToLink} target="blank"> Lista na stronie </a>`;
  console.log(resultSku);

  displaySkuToCopy.innerHTML = resultSku;

}
const generateOrderLink = () => {
  let linkBegin = '';

  const linkBeginXKom =
    'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';

  const linkBeginAlTo =
    'https://xkom-prod.operations.dynamics.com/?cmp=alto&mi=display:SalesTableDetails&SalesId=';

  let orderNumber = inputOrderNumber.value;

  let resultOrderLink = '';

  let orderLink = linkBegin + orderNumber;

  orderNumber = orderNumber.trim();

  if (orderNumber.length === 12) {
    if (orderNumber.startsWith(7)) {
      linkBegin = linkBeginXKom;
    }

    if (orderNumber.startsWith(6)) {
      linkBegin = linkBeginAlTo;
    } else {
      linkBegin = null;
    }

    orderLink = linkBegin + orderNumber;

    console.log(orderLink);

    const listElementOrderLink = `<a href= ${orderLink} target="blank"> ${orderNumber} </a>`;
    console.log(listElementOrderLink);
    resultOrderLink += listElementOrderLink;
    displayOrderLink.innerHTML = resultOrderLink;
  } else {
    displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
  }

  console.log(orderNumber);
  console.log(linkBegin);
};

generateSkuButton.addEventListener('click', displaySkuListToCopy);
generateListButton.addEventListener('click', displaySkuListLink);
generateSkuFromMessageButton.addEventListener(
  'click',
  generateSkuFromMessage
);
generateLinkFromMessageButton.addEventListener(
  'click',
  generateLinkFromMessage
);
generateOrderLinkButton.addEventListener('click', generateOrderLink);