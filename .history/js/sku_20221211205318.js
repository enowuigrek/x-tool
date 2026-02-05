'use strict';

const inputSku = document.querySelector('.input__sku');
const generationSkuButton = document.querySelector('.generation__sku__button');
const dispaySkuToCopy = document.querySelector('.sku__to__copy');
const dispayWrongSku = document.querySelector('.wrong__sku');

let resultSku = '';
let resultWrongSku = '';

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

let checkSku = () => {

  let resultSku = '';
let resultWrongSku = '';
  const listCorrectSku = [];
  const listWrongSku = [];

  const inputText = inputSku.value;
  const splitInputTextArray = inputText.split(/\r?\n/);

  for (let pieceOfInputText of splitInputTextArray) {
    pieceOfInputText = removeZero(pieceOfInputText);

    if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {
      let singleSkuToCopy = pieceOfInputText;
      listCorrectSku.push(singleSkuToCopy);
    } else {
      let singleWrongSku = pieceOfInputText;
      listWrongSku.push(singleWrongSku);
    }
  }

  for (let singleSku of listCorrectSku) {
    singleSku = addZero(singleSku);
    const resultSku = `${singleSku} </br>`;
    return resultSku
  }

  for (let singleWrongSku of listWrongSku) {
    const resultWrongSku = `${singleWrongSku} </br>`;
    return resultWrongSku;
  }
};
generationSkuButton.addEventListener('click', checkSku);

dispaySkuToCopy.innerHTML = resultSku;
dispayWrongSku.innerHTML = resultWrongSku;