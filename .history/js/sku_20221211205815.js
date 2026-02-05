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

let checkSku = (input) => {

  let resultSku = '';
  let resultWrongSku = '';
  const listCorrectSku = [];
  const listWrongSku = [];

  // const input = ;
  const splitinputArray = input.split(/\r?\n/);

  for (let pieceOfinput of splitinputArray) {
    pieceOfinput = removeZero(pieceOfinput);

    if (pieceOfinput.length <= 7 && pieceOfinput.length >= 4) {
      let singleSkuToCopy = pieceOfinput;
      listCorrectSku.push(singleSkuToCopy);
    } else {
      let singleWrongSku = pieceOfinput;
      listWrongSku.push(singleWrongSku);
    }
  }

  for (let singleSku of listCorrectSku) {
    singleSku = addZero(singleSku);
    const resultSku = `${singleSku} </br>`;
    console.log(resultSku)
    return resultSku
    
  }

  console.log(resultSku)

  for (let singleWrongSku of listWrongSku) {
    const resultWrongSku = `${singleWrongSku} </br>`;
    return resultWrongSku;
  }

  dispaySkuToCopy.innerHTML = resultSku;
  dispayWrongSku.innerHTML = resultWrongSku;
};
generationSkuButton.addEventListener('click', checkSku());
