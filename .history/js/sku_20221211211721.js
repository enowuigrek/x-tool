'use strict';

const inputSku = document.querySelector('.input__sku');
const generationSkuButton = document.querySelector('.generation__sku__button');
const dispaySkuToCopy = document.querySelector('.sku__to__copy');
const dispayWrongSku = document.querySelector('.wrong__sku');

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
  const listCorrectSku = [];
  const listWrongSku = [];

  const inputText = inputSku.value;
  const splitInputTextArray = inputText.split(/\r?\n/);

  let resultSku = '';
  console.log(resultSku);

  let resultWrongSku = '';

  for (let pieceOfInputText of splitInputTextArray) {
    pieceOfInputText = removeZero(pieceOfInputText);

    if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {
      let resultSkuToCopy = pieceOfInputText;
      listCorrectSku.push(resultSkuToCopy);
    } else {
      let singleWrongSku = pieceOfInputText;
      listWrongSku.push(singleWrongSku);
    }
  }

  for (let resultSku of listCorrectSku) {
    resultSku = addZero(resultSku);
    resultSku = `${resultSku} </br>`;
    retirn
    console.log(listCorrectSku);
    console.log(resultSku);
  }

  for (let singleWrongSku of listWrongSku) {
    singleWrongSku = `${singleWrongSku} </br>`;
  }
  dispaySkuToCopy.innerHTML = resultSku;
  dispayWrongSku.innerHTML = resultWrongSku;
};
generationSkuButton.addEventListener('click', checkSku);
