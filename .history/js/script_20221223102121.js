'use strict';

//INPUTS
const inputSku = document.('#input_sku');
const inputLinks = document.querySelector('.input_links');
const inputxKomOrderNumber = document.querySelector(
  '.input_x-kom_order_number'
);
const inputAlToOrderNumber = document.querySelector(
  '.input_alto_order_number'
);
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
  if (sku.length >= 4 && sku.length <= 6) {
    return sku;
  } else if (sku.length >= 7) {
    return '00' + sku;
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

  const skuFinder = (phraseBeforeSku) => {
    const foundIndex = splitInputTextArray.indexOf(phraseBeforeSku);
    // splitInputTextArray[foundIndex] = 'delated';
    let skuFromText = splitInputTextArray[foundIndex + 1];
    listSku.push(skuFromText);
  };
  const extractorSkuFromLink = (xKomLink) => {
    const skuFromLink = new RegExp(/\/p\/(\d*)/);
    let skuFromInputLink = skuFromLink.exec(xKomLink)[1];
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
  const noDuplicateSkuList = [...new Set(listSku)];

  for (let sku of noDuplicateSkuList) {
    sku = checkSku(sku);
    const listElementSku = `${sku} </br>`;
    resultSkuToCopyFromLinks += listElementSku;
  }
  displaySkuToCopyFromLinks.innerHTML = resultSkuToCopyFromLinks;
};
const generateOrderLink = () => {
  // const linkBeginXkom =
  //   'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';
  //
  // const linkBeginAlTo =
  //   'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';

  // let orderNumberXkom = inputxKomOrderNumber.value;
  // let orderNumberAlTo = inputAlToOrderNumber.value;

  // let orderLinkAlTo = linkBeginAlTo + orderNumberAlTo;
  // let orderLinkXkom = linkBeginXkom + orderNumberXkom;

  // let orderNumber = 

  // console.log(orderLinkXkom);


  let resultOrderLink = '';

  orderNumber = orderNumber.trim();

  let generateLink;
  generateLink = (orderNumber) => {
    if (orderNumber.length === 12) {
      const listElementOrderLink = `<a href= ${orderLink} target="blank"> ${orderNumber} </a>`;
      resultOrderLink += listElementOrderLink;
      displayOrderLink.innerHTML = resultOrderLink;
    } else {
      displayOrderLink.innerHTML = 'To nie jest numer zamówienia';
    }
  }
  generateLink(orderNumberXkom)
};

generationSkuButton.addEventListener('click', generateSku);
generationSkuFromLinksButton.addEventListener('click', generateSkuFromLinks);
generationOrderLinkButton.addEventListener('click', generateOrderLink);
