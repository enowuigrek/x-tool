'use strict';

//INPUTS
const inputSku = document.getElementById('input_sku');
const inputLinks = document.getElementById('input_links');
const inputOrderNumber = document.getElementById('input_order_number');
//BUTTONS
const generationSkuButton = document.getElementById('generation_sku_button');
const generationSkuFromMessageButton = document.getElementById(
  'generation_sku_from_message_button'
);
const generationLinkFromMessageButton = document.getElementById(
  'generation_link_from_message_button'
);
const generationOrderLinkButton = document.getElementById(
  'generation_order_link_button'
);
//RESULTS
// const display = document.querySelectorAll('.display p');
// console.log(display);
const displaySkuToCopy = document.querySelector('.sku_to_copy');
const displayWrongSku = document.querySelector('.wrong_sku');
const displaySkuToCopyFromLinks = document.querySelector(
  '.sku_to_copy_from_links'
);
const displayOrderLink = document.querySelector('.order_link');

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
  sku = Number(sku);
  sku = String(sku);
  if (sku.length >= 4 && sku.length <= 6) {
    return sku;
  } else if (sku.length == 7) {
    return '00' + sku;
  }
};
// const displayOn = () => {
//   if (display.innerHTML == true) {
//     display.classList.add('active');
//   }
// };
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
const generateSkuFromMessage = () => {
  const input = inputLinks.value;
  const splitInputTextArray = input.replace(/^\s+|\s+$/g, '').split(/\s+/);
  const listSku = [];
  let resultSkuToCopyFromLinks = '';

  const skuFinder = (phraseBeforeSku) => {
    const foundIndex = splitInputTextArray.indexOf(phraseBeforeSku);
    splitInputTextArray[foundIndex] = 'delated';
    let skuFromText = splitInputTextArray[foundIndex + 1];
    skuFromText = checkSku(skuFromText);
    listSku.push(skuFromText);
  };
  const extractorSkuFromLink = (xKomLink) => {
    const skuFromLink = new RegExp(/\/p\/(\d*)/);
    let skuFromInputLink = skuFromLink.exec(xKomLink)[1];
    skuFromInputLink = checkSku(skuFromInputLink);
    listSku.push(skuFromInputLink);
  };

  for (let pieceOfInputText of splitInputTextArray) {
    if (pieceOfInputText.includes('https://www.x-kom.pl/p/'))
      extractorSkuFromLink(pieceOfInputText);

    if (
      pieceOfInputText === 'x-kom:' ||
      pieceOfInputText === 'xkom:' ||
      pieceOfInputText === 'sku:' ||
      pieceOfInputText === 'sku' ||
      pieceOfInputText === '-'
    )
      skuFinder(pieceOfInputText);
  }

  //usunięcie duplikatów
  const listSkuND = [...new Set(listSku)];

  //jeśli w tablicy jest "undefined, (-1 oznacza, że nie ma takiego indexu)"
  if (listSkuND.indexOf(undefined) != -1) {
    listSkuND.splice(listSkuND.indexOf(undefined), 1);
  }

  for (let sku of listSkuND) {
    sku = `${sku} </br>`;
    resultSkuToCopyFromLinks += sku;
  }
  displaySkuToCopyFromLinks.innerHTML = resultSkuToCopyFromLinks;
};

const generateLinkFromMessage = () => {
  const input = inputLinks.value;
  const splitInputTextArray = input.replace(/^\s+|\s+$/g, '').split(/\s+/);
  const listSku = [];
  let resultSkuToCopyFromLinks = '';

  const skuFinder = (phraseBeforeSku) => {
    const foundIndex = splitInputTextArray.indexOf(phraseBeforeSku);
    splitInputTextArray[foundIndex] = 'delated';
    let skuFromText = splitInputTextArray[foundIndex + 1];
    skuFromText = checkSku(skuFromText);
    listSku.push(skuFromText);
  };
  const extractorSkuFromLink = (xKomLink) => {
    const skuFromLink = new RegExp(/\/p\/(\d*)/);
    let skuFromInputLink = skuFromLink.exec(xKomLink)[1];
    skuFromInputLink = checkSku(skuFromInputLink);
    listSku.push(skuFromInputLink);
  };

  for (let pieceOfInputText of splitInputTextArray) {
    if (pieceOfInputText.includes('https://www.x-kom.pl/p/'))
      extractorSkuFromLink(pieceOfInputText);

    if (
      pieceOfInputText === 'x-kom:' ||
      pieceOfInputText === 'xkom:' ||
      pieceOfInputText === 'sku:' ||
      pieceOfInputText === 'sku' ||
      pieceOfInputText === '-'
    )
      skuFinder(pieceOfInputText);
  }

  //usunięcie duplikatów
  const listSkuND = [...new Set(listSku)];

  //jeśli w tablicy jest "undefined, (-1 oznacza, że nie ma takiego indexu)"
  if (listSkuND.indexOf(undefined) != -1) {
    listSkuND.splice(listSkuND.indexOf(undefined), 1);
  }

  skuToLink = '';

  for (let sku of listSkuND) {
    sku = `${sku}%2B`;
    skuToLink += sku;
  }
  skuToLink = skuToLink.slice(0,-3);
  resultSkuToCopyFromLinks = 

  console.log(skuToLink);

  console.log(listSkuND);
  displaySkuToCopyFromLinks.innerHTML = skuToLink;

};
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
      // nie dziala
      displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
    }

    orderLink = linkBegin + orderNumber;

    const listElementOrderLink = `<a href= ${orderLink} target="blank"> ${orderNumber} </a>`;
    resultOrderLink += listElementOrderLink;
    displayOrderLink.innerHTML = resultOrderLink;
  } else {
    displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
  }

  console.log(orderNumber);
  console.log(linkBegin);
};

generationSkuButton.addEventListener('click', generateSku);
generationSkuFromMessageButton.addEventListener(
  'click',
  generateSkuFromMessage
);
generationLinkFromMessageButton.addEventListener(
  'click',
  generateLinkFromMessage
);
generationOrderLinkButton.addEventListener('click', generateOrderLink);
