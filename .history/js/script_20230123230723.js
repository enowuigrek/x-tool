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
console.log('listSku' + listSku);

let resultList = '';
console.log('resultList'+ resultList );

let resultLink = '';
console.log('resultLink' + resultLink);

const clearListSku = () => {
  resultList = ''
  resultLink = ''
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

const generateListSkuArray = () => {
  const input = inputSku.value;
  const splitInputText = input.split(/\r?\n/);

  for (let pieceOfInputText of splitInputText) {
    pieceOfInputText = checkSku(pieceOfInputText);
    listSku.push(pieceOfInputText);
  }
};

const listToCopy = (list) => {
  clearListSku();
  generateListSkuArray();
  delateDuplicateAndUndefined();

  for (let sku of list) {
    sku = `${sku} </br>`;
    resultList += sku;
  }
}

const linkToL
const generateSkuFromMessageArray= () => {

  const input = inputLinks.value;
  const splitInputText = input.replace(/^\s+|\s+$/g, '').split(/\s+/);

  const extractorSkuFromLink = (xKomLink) => {
    const skuFromLink = new RegExp(/\/p\/(\d*)/);
    let skuFromInputLink = skuFromLink.exec(xKomLink)[1];
    skuFromInputLink = checkSku(skuFromInputLink);
    listSku.push(skuFromInputLink);
  };

  const skuFinder = (beforeSku) => {
    const foundIndex = splitInputText.indexOf(beforeSku);
    splitInputText[foundIndex] = 'delated';
    let skuFromText = splitInputText[foundIndex + 1];
    skuFromText = checkSku(skuFromText);
    listSku.push(skuFromText);
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
      skuFinder(pieceOfInputText);
  }
};

const displaySkuListToCopy = () => {
  listToCopy(listSku);
  displaySkuToCopy.innerHTML = resultList;
};
const displaySkuListLink = () => {
  clearListSku();
  generateListSkuArray();
  delateDuplicateAndUndefined();

  const linkBegin = 'href=https://www.x-kom.pl/szukaj?q=';
  let skuToLink = '';

  for (let sku of listSku) {
    sku = `${sku}%2B`;
    skuToLink += sku;
  }

  skuToLink = skuToLink.slice(0, -3);

  if (!skuToLink) {
    resultLink = ''
  } else {
    resultLink = `<a ${linkBegin}${skuToLink} target="blank"> Lista na stronie </a>`;
  }

  displaySkuToCopy.innerHTML = resultLink;
};
const displaySkuListToCopyMessage = () => {
  clearListSku();
  generateSkuFromMessageArray();
  delateDuplicateAndUndefined();

  for (let sku of listSku) {
    sku = `${sku} </br>`;
    resultList += sku;
  }
  displaySkuToCopyFromLinks.innerHTML = resultList;
}
const displaySkuListLinkMessage = () => {
  clearListSku();
  generateSkuFromMessageArray();
  delateDuplicateAndUndefined();

  let skuToLink = '';

  for (let sku of listSku) {
    sku = `${sku}%2B`;
    skuToLink += sku;
  }
  skuToLink = skuToLink.slice(0, -3);
  resultList = `<a href=https://www.x-kom.pl/szukaj?q=${skuToLink} target="blank"> Lista na stronie </a>`;

  displaySkuToCopyFromLinks.innerHTML = resultList;
}

const orderLink = () => {
  const linkBeginXKom =
    'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';

  const linkBeginAlTo =
    'https://xkom-prod.operations.dynamics.com/?cmp=alto&mi=display:SalesTableDetails&SalesId=';

  const easterEgg = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

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
      linkBegin = easterEgg;
    } else {
      linkBegin = undefined;
    }

    orderLink = linkBegin + orderNumber;

    if (linkBegin == undefined) {
      displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
    } else {
      const hrefOrderLink = `<a href= ${orderLink} target="blank"> ${orderNumber} </a>`;
      resultOrderLink += hrefOrderLink;
      displayOrderLink.innerHTML = resultOrderLink;
    }
  } else {
    displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
  }
};

generateSkuButton.addEventListener('click', displaySkuListToCopy);
generateListButton.addEventListener('click', displaySkuListLink);
generateSkuFromMessageButton.addEventListener('click', displaySkuListToCopyMessage);
generateLinkFromMessageButton.addEventListener(
  'click',
  displaySkuListLinkMessage
);
generateOrderLinkButton.addEventListener('click', orderLink);
