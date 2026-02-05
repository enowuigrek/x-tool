'use strict';

const inputSku = document.querySelector('.input__sku');
const generationSkuButton = document.querySelector('.generation__sku__button');
const dispaySkuToCopy = document.querySelector('.sku__to__copy');
const dispayWrongSku = document.querySelector('.wrong__sku');
const inputText = inputSku.value;

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

let checkSku = (input) => {
  const listCorrectSku = [];
  const listWrongSku = [];
  const splitInputTextArray = input.split(/\r?\n/);

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
    singleSku = `${singleSku} </br>`;
    resultSku += singleSku;
  }

  for (let singleWrongSku of listWrongSku) {
    singleWrongSku = `${singleWrongSku} </br>`;
    resultWrongSku += singleWrongSku;
  }
}

checkSku(inputText);




let displaySku = () => {
  dispaySkuToCopy.innerHTML = resultSku;
  dispayWrongSku.innerHTML = resultWrongSku;
}





generationSkuButton.addEventListener('click', displaySku);
