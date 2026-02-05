'use strict';

//Inputs
const inputMessage = document.getElementById('input_links');
const inputOrderNumber = document.getElementById('input_order_number');

//Buttons
const skuListFromMessageButton = document.getElementById(
  'sku_list_from_message_button'
);
const skuLinkFromMessageButton = document.getElementById(
  'sku_link_from_message_button'
);
const orderLinkButton = document.getElementById('order_link_button');

//Copy Buttons
const copyListFromMessageButton = document.getElementById(
  'copy_sku_list_from_message_button'
);

//Clear Buttons
const clearMessageInputButton = document.getElementById('clear_message');
const clearOrderInputButton = document.getElementById('clear_order');

//Result
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

//TODO: przestalo dzialac chyba set na przekazanej tablicy nie dziala, a dzialal na konkretnej
const delateDuplicateAndUndefined = () => {
  listSkuArr = [...new Set(listSkuArr)];

  if (listSkuArr.indexOf(undefined) != -1) {
    listSkuArr.splice(listSkuArr.indexOf(undefined), 1);
  }
};

// TODO: pobawic się filter(), aby nie robic 'undefined' w tablicy kty warunki niespelnione
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
  if (
    result.textContent.includes('Wklej sku oddzielone spacją lub enterem') ||
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
  selObj.removeAllRanges();
  setTimeout(() => {
    result.classList.remove('copied');
  }, 150);
};

//Array with sku generators
const generateInputlistSkuArr = (input) => {
  const inputWords = input.replace(/^\s+|\s+$/g, '').split(/\s+/);

  for (let word of inputWords) {
    word = Math.abs(word);
    const checkedSku = checkSku(word);
    listSkuArr.push(checkedSku);
  }
};
const generateSkuFromMessageArr = (input) => {
  const inputWords = input.replace(/^\s+|\s+$/g, '').split(/\s+/);


  const extractorSkuFromLink = (xKomLink) => {
    const skuFromLink = new RegExp(/\/p\/(\d*)/);
    let skuFromInputLink = skuFromLink.exec(xKomLink)[1];
    skuFromInputLink = checkSku(skuFromInputLink);
    listSkuArr.push(skuFromInputLink);
  };
  // ostatnia konwersacja z chatem jak to zoptymalizowac, ale mysle ze da sie uprosic bardziej niz wskazal

  const extractorSkuFromText = (beforeSku) => {
    const foundIndex = inputWords.indexOf(beforeSku);
    delete inputWords[foundIndex];
    let skuFromText = inputWords[foundIndex + 1];
    skuFromText = checkSku(parseInt(skuFromText));

    listSkuArr.push(skuFromText);
  };

  for (let word of inputWords) {
    if (word.includes('https://www.x-kom.pl/p/')) extractorSkuFromLink(word);

    if (
      word === 'x-kom:' ||
      word === 'xkom:' ||
      word === 'sku:' ||
      word === 'sku' ||
      word === 'code:'
    )
      extractorSkuFromText(word);
  }
};

//List to copy and link to list generators

//TODO: pobawic sie join() w renderlinkToListSku, zamienia tablice na stronh, argument wskazuje co bedzie pomiedzy elementami z tablicy, wiec pewnie bez petli to mozna
const renderListSkuToCopy = (arr) => {
  const skuList = arr.map((sku) => `${sku}<br>`);
  resultList = skuList.join('');
};

const renderlinkToListSku = (arr) => {
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

const displaySkuRenderListSkuToCopyMessage = () => {
  const displayAsLink = false;
  displaySkuListMessage(displayAsLink);
  copyListFromMessageButton.classList.remove('no_active');
};

const displaySkuListLinkMessage = () => {
  const displayAsLink = true;
  displaySkuListMessage(displayAsLink);
  copyListFromMessageButton.classList.add('no_active');
};

const displaySkuListMessage = (displayAsLink) => {
  clearlistSku();
  generateSkuFromMessageArr(inputMessage.value);
  if (!listSkuArr.length) {
    generateInputlistSkuArr(inputMessage.value);
  }
  delateDuplicateAndUndefined();
  if (displayAsLink) {
    renderlinkToListSku(listSkuArr);
    resultSkuFromMessage.innerHTML = resultLink;
  } else {
    renderListSkuToCopy(listSkuArr);
    resultSkuFromMessage.innerHTML = resultList;
  }
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
      resultOrderLink.innerHTML = 'To nie jest numer zamówienia';
    } else {
      let resultOrderLinkHref = `<a href= ${orderLink} target="_blank"> ${orderNumber} </a>`;
      resultOrderLink.innerHTML = resultOrderLinkHref;
    }
  } else if (orderNumber == '') {
    resultOrderLink.innerHTML = '';
  } else {
    resultOrderLink.innerHTML = 'To nie jest numer zamówienia';
  }
};

//Event Listeners
skuListFromMessageButton.addEventListener(
  'click',
  displaySkuRenderListSkuToCopyMessage
);
skuLinkFromMessageButton.addEventListener('click', displaySkuListLinkMessage);
orderLinkButton.addEventListener('click', displayOrderLink);

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

copyListFromMessageButton.addEventListener('click', () => {
  copySku(resultSkuFromMessage);
});

resultSkuFromMessage.addEventListener('click', () => {
  resultSkuFromMessage.classList.remove('selected');
});

//DARK MODE
const switchButton = document.querySelector('header button');
let theme = localStorage.getItem('theme');

switchButton.addEventListener('click', () => {
  if (theme === 'dark') {
    document.querySelector('body').classList.remove('dark');
    document.querySelector('body').classList.add('light');
    theme = 'light';
  } else {
    document.querySelector('body').classList.remove('light');
    document.querySelector('body').classList.add('dark');
    theme = 'dark';
  }

  localStorage.setItem('theme', theme);
});

if (theme === 'dark') {
  document.querySelector('body').classList.add('dark');
}

if (theme === 'light') {
  document.querySelector('body').classList.add('light');
}
