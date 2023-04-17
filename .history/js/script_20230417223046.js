'use strict';

//Inputs
const inputSku = document.getElementById('input_sku');
const inputMessage = document.getElementById('input_links');
const inputOrderNumber = document.getElementById('input_order_number');

//Buttons
const skuListButton = document.getElementById('sku_list_button');
const skuLinkButton = document.getElementById('sku_link_button');
const skuListFromMessageButton = document.getElementById(
  'sku_list_from_message_button'
);
const skuLinkFromMessageButton = document.getElementById(
  'sku_link_from_message_button'
);
const orderLinkButton = document.getElementById('order_link_button');

//Copy Buttons
const copyskuListButton = document.getElementById('copy_sku_list_button');
const copyListFromMessageButton = document.getElementById('copy_sku_list_from_message_button');

//Clear Buttons
const clearSkuInputButton = document.getElementById('clear_sku');
const clearMessageInputButton = document.getElementById('clear_message');
const clearOrderInputButton = document.getElementById('clear_order');

//Result
const resultSkuFromInput = document.getElementById('sku_from_input');
const resultSkuFromMessage = document.getElementById('sku_from_message');
const resultOrderLink = document.getElementById('order_link');

let listSkuArr = [];
let resultList = '';
let resultLink = '';

//
const clearlistSku = () => {
  resultList = '';
  resultLink = '';
  listSkuArr.length = 0;
};
const delateDuplicateAndUndefined = () => {
  listSkuArr = [...new Set(listSkuArr)];

  if (listSkuArr.indexOf(undefined) != -1) {
    listSkuArr.splice(listSkuArr.indexOf(undefined), 1);
  }
};
const checkSku = (sku) => {
  //remove zero
  sku = Number(sku);
  sku = String(sku);
  //ad zero if length is 7
  if (sku.length >= 5 && sku.length <= 6) {
    return sku;
  } else if (sku.length == 7) {
    return '00' + sku;
  }
};
const copySku = (result) => {
  if (result.textContent.includes('Wklej sku oddzielone spacją lub enterem') ||
    result.textContent.includes('Nie znalazłem sku w tym tekście') ||
    result.textContent.includes('Lista na stronie')
  ) {
    return;
  }
  result.classList.add('selected');
  result.classList.add('copied');
  let selObj = window.getSelection();
    selObj.selectAllChildren(result);
    document.execCommand('copy');
  setTimeout(() => {
    result.classList.remove('copied');
  }, 150);
};

//Array with sku generators
const generateInputlistSkuArr = (input) => {
  const splitInputText = input.replace(/^\s+|\s+$/g, '').split(/\s+/);

  for (let pieceOfInputText of splitInputText) {
    pieceOfInputText = checkSku(pieceOfInputText);
    listSkuArr.push(pieceOfInputText);
  }
};
const generateSkuFromMessageArr = (input) => {
  const splitInputText = input.replace(/^\s+|\s+$/g, '').split(/\s+/);

  const extractorSkuFromLink = (xKomLink) => {
    const skuFromLink = new RegExp(/\/p\/(\d*)/);
    let skuFromInputLink = skuFromLink.exec(xKomLink)[1];
    skuFromInputLink = checkSku(skuFromInputLink);
    listSkuArr.push(skuFromInputLink);
  };

  const extractorSkuFromText = (beforeSku) => {
    const foundIndex = splitInputText.indexOf(beforeSku);
    splitInputText[foundIndex] = 'delated';
    let skuFromText = splitInputText[foundIndex + 1];
    if (skuFromText.endsWith(')')) {
      skuFromText = skuFromText.replace(/\)$/, '');
    };
    skuFromText = checkSku(skuFromText);
    listSkuArr.push(skuFromText);
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
      extractorSkuFromText(pieceOfInputText);

    if (pieceOfInputText.includes('https://www.x-kom.pl/lista/'))
      extractorSkuFromList(pieceOfInputText);
  }
};

//List to copy and link to list generators
const listToCopy = (arr) => {
  for (let sku of arr) {
    sku = `${sku}<br>`;
    resultList += sku;
  }
};
const linkToList = (arr) => {
  const linkBegin = 'href=https://www.x-kom.pl/szukaj?q=';
  let skuToLink = '';

  for (let sku of arr) {
    sku = `${sku}%2B`;
    skuToLink += sku;
  }

  skuToLink = skuToLink.slice(0, -3);

  if (!skuToLink) {
    resultLink = '';
  } else {
    resultLink = `<a ${linkBegin}${skuToLink} target="_blank"> Lista na stronie </a>`;
  }
};

//Push-button functions
const displaySkuListToCopyInput = () => {
  clearlistSku();
  generateInputlistSkuArr(inputSku.value);
  delateDuplicateAndUndefined();
  listToCopy(listSkuArr);
  copyskuListButton.classList.remove('no_active');
  resultSkuFromInput.innerHTML = resultList;
  if (!resultSkuFromInput.innerHTML) {
    resultSkuFromInput.innerHTML = 'Wklej sku oddzielone spacją lub enterem';
    copyskuListButton.classList.add('no_active');
  }
};
const displaySkuListLinkInput = () => {
  copyskuListButton.classList.add('no_active');
  clearlistSku();
  generateInputlistSkuArr(inputSku.value);
  delateDuplicateAndUndefined();
  linkToList(listSkuArr);
  resultSkuFromInput.innerHTML = resultLink;
  if (!resultSkuFromInput.innerHTML) {
    resultSkuFromInput.innerHTML = 'Wklej sku oddzielone spacją lub enterem';
  }
};
const displaySkuListToCopyMessage = () => {
  clearlistSku();
  generateSkuFromMessageArr(inputMessage.value);
  delateDuplicateAndUndefined();
  listToCopy(listSkuArr);
  copyListFromMessageButton.classList.remove('no_active');
  resultSkuFromMessage.innerHTML = resultList;
  if (!resultSkuFromMessage.innerHTML) {
    resultSkuFromMessage.innerHTML = 'Nie znalazłem sku w tym tekście';
    copyListFromMessageButton.classList.add('no_active');
  }
};
const displaySkuListLinkMessage = () => {
  copyListFromMessageButton.classList.add('no_active');
  clearlistSku();
  generateSkuFromMessageArr(inputMessage.value);
  delateDuplicateAndUndefined();
  linkToList(listSkuArr);
  resultSkuFromMessage.innerHTML = resultLink;
  if (!resultSkuFromMessage.innerHTML) {
    resultSkuFromMessage.innerHTML = 'Nie znalazłem sku w tym tekście';
  }
};
const displayOrderLink = () => {
  const linkBeginXKom =
    'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';

  const linkBeginAlTo =
    'https://xkom-prod.operations.dynamics.com/?cmp=alto&mi=display:SalesTableDetails&SalesId=';

  const xKomShop = 'https://youtu.be/dQw4w9WgXcQ';

  let linkBegin = '';
  let orderLink = '';
  let orderNumber = inputOrderNumber.value.trim();

  if (orderNumber.length === 12) {
    if (orderNumber.startsWith(7)) {
      linkBegin = linkBeginXKom;
    } else if (orderNumber.startsWith(6)) {
      linkBegin = linkBeginAlTo;
    } else if (orderNumber.startsWith(9)) {
      linkBegin = xKomShop;
    } else {
      linkBegin = undefined;
    }

    orderLink = linkBegin + orderNumber;

    if (linkBegin == undefined) {
      console.log(linkBegin);
      resultOrderLink.innerHTML = 'To nie jest numer zamówienia';
    } else {
      const resultOrderLink = `<a href= ${orderLink} target="_blank"> ${orderNumber} </a>`;
      resultOrderLink.innerHTML = resultOrderLink;
      resultOrderLink.classList.add('copied');
    }
  } else if (orderNumber == '') {
    resultOrderLink.innerHTML = '';
  } else {
    resultOrderLink.innerHTML = 'To nie jest numer zamówienia';
  }
};

//Event Listeners
skuListButton.addEventListener('click', displaySkuListToCopyInput);
skuLinkButton.addEventListener('click', displaySkuListLinkInput);
skuListFromMessageButton.addEventListener('click', displaySkuListToCopyMessage);
skuLinkFromMessageButton.addEventListener('click', displaySkuListLinkMessage);
orderLinkButton.addEventListener('click', displayOrderLink);

clearSkuInputButton.addEventListener('click', () => {
  if (inputSku.value == '') {
    resultSkuFromInput.innerHTML = '';
    copyskuListButton.classList.add('no_active');
    resultSkuFromInput.classList.remove('selected');
  }
  inputSku.value = '';
});
clearMessageInputButton.addEventListener('click', () => {
  if (inputMessage.value == '') {
    resultSkuFromMessage.innerHTML = '';
    copyListFromMessageButton.classList.add('no_active');
    resultSkuFromMessage.classList.remove('selected');
  }
  inputMessage.value = '';
});

clearOrderInputButton.addEventListener('click', () => {
  if (inputOrderNumber.value == '') {
    resultOrderLink.innerHTML = '';
  }
  inputOrderNumber.value = '';
});

copyskuListButton.addEventListener('click', () => {
  copySku(resultSkuFromInput);
});
copyListFromMessageButton.addEventListener('click', () => {
  copySku(resultSkuFromMessage);
});
resultSkuFromInput.addEventListener('click', () => {
  resultSkuFromInput.classList.remove('selected')
});
resultSkuFromMessage.addEventListener('click', () => {
  resultSkuFromMessage.classList.remove('selected')
});

//DARK MODE

const switchButton = document.querySelector("header button");
let theme = localStorage.getItem("theme");

switchButton.addEventListener("click", () => {
    if (theme === "dark") {
        document.querySelector("body").classList.remove("dark");
        document.querySelector("body").classList.add("light");
        theme = "light";
    } else {
        document.querySelector("body").classList.remove("light");
        document.querySelector("body").classList.add("dark");
        theme = "dark";
    }

    localStorage.setItem("theme", theme);
});

if (theme === "dark") {
    document.querySelector("body").classList.add("dark");
}

if (theme === "light") {
    document.querySelector("body").classList.add("light");
}