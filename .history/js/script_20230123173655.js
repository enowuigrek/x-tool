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

let listSku = [];

const clearListSku = () => {
  listSku.length = 0;
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
const delateDuplicateAndUndefined = () => {
  listSku = [...new Set(listSku)];

  if (listSku.indexOf(undefined) != -1) {
    listSku.splice(listSku.indexOf(undefined), 1);
  }
};
const generateListSku = () => {
  const input = inputSku.value;
  const splitInputTextArray = input.split(/\r?\n/);

  for (let pieceOfInputText of splitInputTextArray) {
    pieceOfInputText = checkSku(pieceOfInputText);
    listSku.push(pieceOfInputText);
  }
};
const generateSkuFromMessage = () => {
  clearListSku();

  const input = inputLinks.value;
  const splitInputTextArray = input.replace(/^\s+|\s+$/g, '').split(/\s+/);

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
      pieceOfInputText === 'sku'
    )
      skuFinder(pieceOfInputText);
  }

  delateDuplicateAndUndefined(listSku);

  for (let sku of listSku) {
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

  let skuToLink = '';
  for (let sku of listSkuND) {
    sku = `${sku}%2B`;
    skuToLink += sku;
  }
  skuToLink = skuToLink.slice(0, -3);
  resultSkuToCopyFromLinks = `<a href=https://www.x-kom.pl/szukaj?q=${skuToLink} target="blank"> Lista na stronie </a>`;
  console.log(resultSkuToCopyFromLinks);

  displaySkuToCopyFromLinks.innerHTML = resultSkuToCopyFromLinks;
};

const displaySkuListToCopy = () => {
  clearListSku();
  generateListSku();
  delateDuplicateAndUndefined();

  let resultList = '';

  for (let sku of listSku) {
    sku = `${sku} </br>`;
    resultList += sku;
  }
  displaySkuToCopy.innerHTML = resultList;
};
const displaySkuListLink = (listSku) => {
  clearListSku();
  generateListSku();
  delateDuplicateAndUndefined();

  const linkBegin = 'href=https://www.x-kom.pl/szukaj?q='
  let resultLink = '';
  let skuToLink = '';

  for (let sku of listSku) {
    sku = `${sku}%2B`;
    skuToLink += sku
  }

  skuToLink = skuToLink.slice(0, -3);

  resultLink = `<a ${linkBegin} ${skuToLink} target="blank"> Lista na stronie </a>`;

  displaySkuToCopy.innerHTML = resultLink;
};

const orderLink = () => {
  const linkBeginXKom =
    'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';

  const linkBeginAlTo =
    'https://xkom-prod.operations.dynamics.com/?cmp=alto&mi=display:SalesTableDetails&SalesId=';


  let linkBegin = '';
  let resultOrderLink = '';
  let orderNumber = inputOrderNumber.value;
  let orderLink = linkBegin + orderNumber;

  orderNumber = orderNumber.trim();

  if (orderNumber.length === 12) {
    if (orderNumber.startsWith(7)) {
      linkBegin = linkBeginXKom;
    }
    if (orderNumber.startsWith(6)) {
      linkBegin = linkBeginAlTo;
    } else {
      linkBegin = undefined;
      orderNumber = undefined;
    }

    console.log(linkBegin);

    orderLink = linkBegin + orderNumber;

    if (orderLink ==)

    console.log(orderLink);

    const hrefOrderLink = `<a href= ${orderLink} target="blank"> ${orderNumber} </a>`;
    console.log(hrefOrderLink);
    resultOrderLink += hrefOrderLink;
    displayOrderLink.innerHTML = resultOrderLink;
  } else {
    displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
  }
};

generateSkuButton.addEventListener('click', displaySkuListToCopy);
generateListButton.addEventListener('click', displaySkuListLink);
generateSkuFromMessageButton.addEventListener('click', generateSkuFromMessage);
generateLinkFromMessageButton.addEventListener(
  'click',
  generateLinkFromMessage
);
generateOrderLinkButton.addEventListener('click', orderLink);
