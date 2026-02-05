'use strict';

const inputSku = document.querySelector('.input__sku');
const generationSkuButton = document.querySelector('.generation__sku__button');
const dispaySkuToCopy= document.querySelector('.sku__to__copy');
const dispayWrongSku = document.querySelector('.wrong__sku');

const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);

let generateSku = () => {
  const inputText = inputSku.value;
  const splitInputTextArray = inputText.split(/\r?\n/);

  const listCorrectSku = [];
  const listWrongSku = [];

  let resultSkuToCopy = '';
  let resultWrongSku = '';

  for (let pieceOfInputText of splitInputTextArray) {
    //zmienia w number, aby pozbyć się ewentualnych zer z przodu,po zmiana z powrotem na string
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
  // wyciąganie SKU z linku
  // const skuFrominputText = skuFromProductLinkMatcher.exec(pieceOfInputText)[1];
  // listCorrectSku.push(skuFrominputText);
  for (let singleWrongSku of listWrongSku) {
    const listElementWrongSku = '<li>' + singleWrongSku + '</li>'
    resultWrongSku += listElementWrongSku;
  };

  dispayWrongSku.innerHTML = resultWrongSku;

  for (let singleSku of listCorrectSku) {
    let addZero = () => {
      if (singleSku.length > 6) {
        singleSku = '00' + singleSku
      };
    };
    addZero();
    const listElementSku = '<li>' + singleSku + '</li>'
    resultSkuToCopy += listElementSku;
  };
  dispaySkuToCopy.innerHTML = resultSkuToCopy;
};
generationSkuButton.addEventListener('click', generateSku);