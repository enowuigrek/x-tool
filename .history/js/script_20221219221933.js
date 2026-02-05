'use strict';

//INPUTS
const inputSku = document.querySelector('.input__sku');
const inputLinks = document.querySelector('.input__links');
const inputOrderNumber = document.querySelector('.input__order__number');
//BUTTONS
const generationSkuButton = document.querySelector('.generation__sku__button');
const generationSkuFromLinksButton = document.querySelector(
  '.generation__sku__from__links__button'
);
const generationOrderLinkButton = document.querySelector(
  '.generation__order__link__button'
);
//RESULTS
const displaySkuToCopy = document.querySelector('.sku__to__copy');
const displayWrongSku = document.querySelector('.wrong__sku');
const displaySkuToCopyFromLinks = document.querySelector(
  '.sku__to__copy__from__links'
);
const displayOrderLink = document.querySelector('.order__link');

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
const generateSku = () => {
  let resultSku = '';
  let resultWrongSku = '';

  const listCorrectSku = [];
  const listWrongSku = [];

  const inputText = inputSku.value;
  const splitInputTextArray = inputText.split(/\r?\n/);

  for (let pieceOfInputText of splitInputTextArray) {
    pieceOfInputText = removeZero(pieceOfInputText);

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
  const inputText = inputLinks.value;

  const splitInputTextArray = inputText.replace(/^\s+|\s+$/g, '').split(/\s+/);

  const skuFromTextArray = [];
  const skuFromLinkArray = [];

  let resultSkuToCopyFromLinks = '';

  for (let pieceOfInputText of splitInputTextArray) {

    console.log(pieceOfInputText);

    if (pieceOfInputText == 'x-kom:') {

        const foundXKomIndex = splitInputTextArray.indexOf(pieceOfInputText)
        const skuFromText = splitInputTextArray[foundXKomIndex+1]
        skuFromTextArray.push(skuFromText);
      }

    if (pieceOfInputText.includes('https://www.x-kom.pl/p/')) {

        const skuFromInputLink = skuFromLink.exec(pieceOfInputText)[1];
        skuFromLinkArray.push(skuFromInputLink);
      }
  }
  console.log(skuFromLinkArray);
  console.log(skuFromTextArray);

  const listCorrectSku = skuFromTextArray + skuFromLinkArray;

  for (let singleSku of listCorrectSku) {
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

  // orderNumber = orderNumber.replace(/ /g, '');
  orderNumber = orderNumber.trim();
  // console.log(orderNumber);


  if (orderNumber.length === 12) {
    const listElementOrderLink = `<a href=${orderLink} target="blank"> ${orderNumber} </a>`;
    resultOrderLink += listElementOrderLink;
    displayOrderLink.innerHTML = resultOrderLink;
  } else {
    displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
  }
};

generationSkuButton.addEventListener('click', generateSku);
generationSkuFromLinksButton.addEventListener('click', generateSkuFromLinks);
generationOrderLinkButton.addEventListener('click', generateOrderLink);
