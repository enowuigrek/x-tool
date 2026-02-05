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
const displayWrongSku = document.querySelector('.wrong_sku');
const displaySkuToCopyFromLinks = document.querySelector(
  '.sku_to_copy_from_links'
);
const displayOrderLink = document.querySelector('.order_link');

const listSku = [];

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
// const generateSku = () => {
//   let resultSku = '';

//   const listSku = [];
//   const listWrongSku = [];

//   const input = inputSku.value;
//   const splitInputTextArray = input.split(/\r?\n/);

//   for (let pieceOfInputText of splitInputTextArray) {
//     pieceOfInputText = removeZero(pieceOfInputText);

//     if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {
//       listSku.push(pieceOfInputText);
//     } else {
//       listWrongSku.push(pieceOfInputText);
//     }
//   }

//   for (let singleSku of listSku) {
//     singleSku = addZero(singleSku);
//     singleSku = `${singleSku} </br>`;
//     resultSku += singleSku;
//   }

//   for (let singleWrongSku of listWrongSku) {
//     singleWrongSku = `${singleWrongSku} </br>`;
//     resultWrongSku += singleWrongSku;
//   }
//   displaySkuToCopy.innerHTML = resultSku;
//   displayWrongSku.innerHTML = resultWrongSku;
// };

const generateList = () => {

  const input = inputSku.value;
  const splitInputTextArray = input.split(/\r?\n/);

  for (let pieceOfInputText of splitInputTextArray) {
    pieceOfInputText = removeZero(pieceOfInputText);

    if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {
      listSku.push(pieceOfInputText);
    }
  }

};

console.log(listSku);

const skuToListLink = () => {

  generateList();
  
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

  //jeśli w tablicy jest "undefined", (-1 oznacza, że nie ma takiego indexu)
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

// generateSkuButton.addEventListener('click', generateSku);
generateListButton.addEventListener('click', skuToListLink);
generateSkuFromMessageButton.addEventListener(
  'click',
  generateSkuFromMessage
);
generateLinkFromMessageButton.addEventListener(
  'click',
  generateLinkFromMessage
);
generateOrderLinkButton.addEventListener('click', generateOrderLink);