'use strict';

const inputSku = document.querySelector('.input__sku');
const generationSkuButton = document.querySelector('.generation__sku__button');
const dispaySkuToCopy = document.querySelector('.sku__to__copy');
const dispayWrongSku = document.querySelector('.wrong__sku');

let addZero = () => {
  if (singleSku.length > 6) {
    singleSku = '00' + singleSku
  };
};

function addZero(sku) {
  if (sku.length = 7) {
    return '00' + sku
  } else {
    return sku
  }
}

let generateSku = () => {
  const inputText = inputSku.value;
  const splitInputTextArray = inputText.split(/\r?\n/);

  const listCorrectSku = [];
  const listWrongSku = [];

  let resultSkuToCopy = '';
  let resultWrongSku = '';

  for (let pieceOfInputText of splitInputTextArray) {

    pieceOfInputText *= 1;
    pieceOfInputText += '';

    if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {
      let singleSkuToCopy = pieceOfInputText;
      listCorrectSku.push(singleSkuToCopy);
    }
    else {
      let singleWrongSku = pieceOfInputText;
      listWrongSku.push(singleWrongSku);
    };
  };

  for (let singleWrongSku of listWrongSku) {
    const listElementWrongSku = singleWrongSku + '</br>'
    resultWrongSku += listElementWrongSku;
  };

  dispayWrongSku.innerHTML = resultWrongSku;

  for (let singleSku of listCorrectSku) {

    addZero();
    const listElementSku = singleSku + '</br>'
    resultSkuToCopy += listElementSku;
  };
  dispaySkuToCopy.innerHTML = resultSkuToCopy;
};
generationSkuButton.addEventListener('click', generateSku);