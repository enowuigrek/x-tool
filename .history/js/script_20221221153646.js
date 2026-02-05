'use strict';

//INPUTS
const inputSku = document.querySelector('.input_sku');
const inputLinks = document.querySelector('.input_links');
const inputOrderNumber = document.querySelector('.input_order_number');
//BUTTONS
const generationSkuButton = document.querySelector('.generation_sku_button');
const generationSkuFromLinksButton = document.querySelector(
  '.generation_sku_from_links_button'
);
const generationOrderLinkButton = document.querySelector(
  '.generation_order_link_button'
);
//RESULTS
const displaySkuToCopy = document.querySelector('.sku_to_copy');
const displayWrongSku = document.querySelector('.wrong_sku');
const displaySkuToCopyFromLinks = document.querySelector(
  '.sku_to_copy_from_links'
);
const displayOrderLink = document.querySelector('.order_link');

const linkBegin =
  'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';
const skuFromLink = new RegExp(/\/p\/(\d*)/);

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
  if (sku.length <= 7 && sku.length >= 4 && parse) {
    return sku;
  }
};
const generateSku = () => {

  //TODO: Pozmieniać nazwy zmiennych. InputSku i InputText w tej formie są już dziwne. generateSku też.

  let resultSku = '';
  let resultWrongSku = '';

  const listCorrectSku = [];
  const listWrongSku = [];

  const input = inputSku.value;
  const splitInputTextArray = input.split(/\r?\n/);

  for (let pieceOfInputText of splitInputTextArray) {
    pieceOfInputText = removeZero(pieceOfInputText);

    // TODO: Jest do tego wydzielona funkcja ale bez else. Narazie zostawiam, bo potrzebuje błędne sku
    if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {
      listCorrectSku.push(pieceOfInputText);
    } else {
      listWrongSku.push(pieceOfInputText);
    }
  }

  for (let singleSku of listCorrectSku) {
    singleSku = addZero(singleSku);
    singleSku = `${singleSku} </br>`;
    resultSku += singleSku;
  }

  for (let singleWrongSku of listWrongSku) {
    singleWrongSku = `${singleWrongSku} </br>`;
    resultWrongSku += singleWrongSku;
  }
  displaySkuToCopy.innerHTML = resultSku;
  displayWrongSku.innerHTML = resultWrongSku;
};
const generateSkuFromLinks = () => {
  const input = inputLinks.value;
  const splitInputTextArray = input.replace(/^\s+|\s+$/g, '').split(/\s+/);

  const listSku = [];
  let resultSkuToCopyFromLinks = '';

  for (let pieceOfInputText of splitInputTextArray) {

    if (pieceOfInputText === 'x-kom:') {

        const foundIndex = splitInputTextArray.indexOf(pieceOfInputText)
        splitInputTextArray[foundIndex] = 'delated_x-kom';
        let skuFromText = splitInputTextArray[foundIndex+1]
        console.log(skuFromText);

        skuFromText = checkSku(skuFromText);
        listSku.push(skuFromText);
        console.log(skuFromText);

      }

    if (pieceOfInputText.includes('https://www.x-kom.pl/p/')) {

        const skuFromInputLink = skuFromLink.exec(pieceOfInputText)[1];
        skuFromInputLink = checkSku(skuFromInputLink);
        listSku.push(skuFromInputLink);
      }
  }

  for (let singleSku of listSku) {
    let resultSingleSku = addZero(singleSku);
    const listElementSku = resultSingleSku + '</br>';
    resultSkuToCopyFromLinks += listElementSku;
  }
  displaySkuToCopyFromLinks.innerHTML = resultSkuToCopyFromLinks;
};
const generateOrderLink = () => {
  let orderNumber = inputOrderNumber.value;
  let orderLink = linkBegin + orderNumber;
  let resultOrderLink = '';

  orderNumber = orderNumber.trim();

  if (orderNumber.length === 12) {
    const listElementOrderLink = `<a href= ${orderLink} target="blank"> ${orderNumber} </a>`;
    resultOrderLink += listElementOrderLink;
    displayOrderLink.innerHTML = resultOrderLink;
  } else {
    displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
  }
};

generationSkuButton.addEventListener('click', generateSku);
generationSkuFromLinksButton.addEventListener('click', generateSkuFromLinks);
generationOrderLinkButton.addEventListener('click', generateOrderLink);