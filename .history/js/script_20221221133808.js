'use strict';

//INPUTS
const inputSku = document.querySelector('.input_sku');
const inputMessage = document.querySelector('.input_message');
const inputOrderNumber = document.querySelector('.input_order_number');
//BUTTONS
const generationSkuButton = document.querySelector('.generation_sku_button');
const generationSkuFromMessageButton = document.querySelector(
  '.generation_sku_from_Message_button'
);
const generationOrderLinkButton = document.querySelector(
  '.generation_order_link_button'
);
//RESULTS
const displaySkuToCopy = document.querySelector('.sku_to_copy');
const displayWrongSku = document.querySelector('.wrong_sku');
const displaySkuToCopyFromMessage = document.querySelector(
  '.sku_to_copy_from_Message'
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
const generateSkuFromMessage = () => {
  const input = inputMessage.value;
  const splitInputTextArray = input.replace(/^\s+|\s+$/g, '').split(/\s+/);

  const listSku = [];
  let resultSkuToCopyFromMessage = '';

  for (let pieceOfInputText of splitInputTextArray) {
    if (pieceOfInputText === 'x-kom:') {
      const foundIndex = splitInputTextArray.indexOf(pieceOfInputText);
      splitInputTextArray[foundIndex] = 'delated_x-kom';
      listSku.push(splitInputTextArray[foundIndex + 1]);
    }

    if (pieceOfInputText.includes('https://www.x-kom.pl/p/')) {
      const skuFromInputLink = skuFromLink.exec(pieceOfInputText)[1];
      listSku.push(skuFromInputLink);
    }
  }

  for (let singleSku of listSku) {
    let resultSingleSku = addZero(singleSku);
    const listElementSku = resultSingleSku + '</br>';
    resultSkuToCopyFromMessage += listElementSku;
  }
  displaySkuToCopyFromMessage.innerHTML = resultSkuToCopyFromMessage;
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
  console.log(resultOrderLink);
};

generationSkuButton.addEventListener('click', generateSku);
generationSkuFromMessageButton.addEventListener('click', generateSkuFromMessage);
generationOrderLinkButton.addEventListener('click', console.log('dziala'));