'use strict';

const inputLinks = document.querySelector('.input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');
const alert = document.querySelector('.alert');
const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);

let generateSku = () => {

  const inputText = inputLinks.value;
  const splitInputTextArray = inputText.split(/\r?\n/);

  const listCorrectSku = [];
  const listWrongSku = [];

  let resultSkut = '';
  let resultWrongSku = '';

  for (let pieceOfInputText of splitInputTextArray) {

    //zmienia w number, aby pozbyć się ewentualnych zer z przodu,po zmiana z powrotem na string
    pieceOfInputText *= 1;
    pieceOfInputText += '';

    if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {

      let singleSkuToCopy = pieceOfInputText;
      listCorrectSku.push(singleSkuToCopy);
    }
    // narazie zakomentowane wyciąganie SKU z linku
    // else if (!null){
    //   const skuFrominputText = skuFromProductLinkMatcher.exec(pieceOfInputText)[1];
    //   listCorrectSku.push(skuFrominputText);
    // }

  };

  for (let singleWrongSku of listWrongSku) {

    const listElementWrongSku = '<li>' + singleWrongSku + '</li>'
    resultWrongSku += listElementWrongSku;
  };

  alert.innerHTML = resultWrongSku;

  for (let singleSku of listCorrectSku) {

    let addZero = () => {
      if (parseInt(singleSku) && singleSku.length > 6) {
        singleSku = '00' + singleSku
      };
    };
    addZero();

    const listElementSku = '<li>' + singleSku + '</li>'
    resultSku += listElementSku;
  };

  resultSku.innerHTML = resultSku;
};

generationButton.addEventListener('click', generateSku);