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
  if (sku.length <= 6 && sku.length >= 4) {
    return sku;
  } else if (sku.length >= 7) {
    return '00' + sku;
  } else {
    let wrongSku = sku;
    return wrongSku
  }
};
const generateSku = () => {
  //TODO: Pozmieniać nazwy zmiennych. InputSku i InputText w tej formie są już dziwne. generateSku też.
  const listWrongSku = [];
  let resultSku = '';
  let resultWrongSku = '';

  const listCorrectSku = [];
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

  const skuFinder = (phraseBeforeSku) => {
    const trash =[];
    const foundIndex = splitInputTextArray.indexOf(phraseBeforeSku);
    splitInputTextArray[foundIndex] = '...';
    let skuFromText = splitInputTextArray[foundIndex + 1];
    skuFromText = checkSku(skuFromText);
    //TODO: rozkimić aby nie wyświetłało nan gdy sku nie jest sku
    if (skuFromText == NaN) {
      trash.push(skuFromText);
    } else {
      listSku.push(skuFromText)
    }
      console.log(skuFromText);
      console.log(trash);
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

    if (pieceOfInputText === 'x-kom:') skuFinder(pieceOfInputText);
    if (pieceOfInputText === 'xkom:') skuFinder(pieceOfInputText);
    if (pieceOfInputText === 'sku:') skuFinder(pieceOfInputText);
    if (pieceOfInputText === 'sku') skuFinder(pieceOfInputText);
  }
  console.log9
  const noDuplicatesSkuList = [...new Set(listSku)];
  console.log(noDuplicatesSkuList)
  for (let sku of noDuplicatesSkuList) {
    const listElementSku = sku + '</br>';
    resultSkuToCopyFromLinks += listElementSku;
  }
  displaySkuToCopyFromLinks.innerHTML = resultSkuToCopyFromLinks;
};
const generateOrderLink = () => {
  const linkBegin =
  'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';

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
