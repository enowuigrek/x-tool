'use strict';

const inputLinks = document.querySelector('.input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');
const alert = document.querySelector('.alert');
const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);

let generateSku = () => {

  const inputText = inputLinks.value;
  const splitInputTextArray = inputText.split(/\r?\n/);
  const listSkuToCopy = [];
  const alertData = [];

  let resultToCopy = '';
  let alertDisplay = '';

  for (let pieceOfInputText of splitInputTextArray) {

    //zmienia w number, aby pozbyć się ewentualnych zer z przodu,po zmiana z powrotem na string
    pieceOfInputText *= 1;
    pieceOfInputText += '';

    if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {

      let singleSkuToCopy = pieceOfInputText;
      listSkuToCopy.push(singleSkuToCopy);
    }
    // narazie zakomentowane wyciąganie SKU z linku
    // else if (!null){
    //   const skuFrominputText = skuFromProductLinkMatcher.exec(pieceOfInputText)[1];
    //   listSkuToCopy.push(skuFrominputText);
    // }
    else {
      alertData.push(pieceOfInputText);
    }
    console.log(listSkuToCopy);
  };

  for (let badSku of alertData) {

    const alertElementSku = '<li>' + badSku + '</li>'

    alertDisplay = alertDisplay + alertElementSku;
  };

  alert.innerHTML = alertDisplay;

  for (let singleSku of listSkuToCopy) {

    let addZero = () => {
      if (parseInt(singleSku) && singleSku.length > 6) {
        singleSku = '00' + singleSku
      };
    };

    addZero();

    const listElementSku = '<li>' + singleSku + '</li>'

    resultToCopy = resultToCopy + listElementSku;
  };

  resultSku.innerHTML = resultToCopy;
};

generationButton.addEventListener('click', generateSku);