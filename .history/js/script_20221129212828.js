'use strict';

const inputLinks = document.querySelector('.input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');
const alert = document.querySelector('.alert');
const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);

let resultToCopy = '';
let alertDisplay = '';

let generateSku = () => {

  const inputText = inputLinks.value;
  const splitInputTextArray = inputText.split(/\r?\n/);
  const listSku = [];
  const alertData = [];

  for (let pieceOfInputText of splitInputTextArray) {

    console.log(pieceOfInputText);

    //zmiena w number, aby pozbyć się ewentualnych zer z przodu, po zmiana z powrotem na string
    pieceOfInputText *= 1;
    console.log(pieceOfInputText);

    pieceOfInputText += '';
    console.log(pieceOfInputText);

    if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {
      listSku.push(pieceOfInputText);
    }
    // narazie zakomentowane wyciąganie SKU z linku
    // else if (!null){
    //   const skuFrominputText = skuFromProductLinkMatcher.exec(pieceOfInputText)[1];
    //   listSku.push(skuFrominputText);
    // }
    else {
      alertData.push(pieceOfInputText);
    }
    console.log(listSku);
  };

  for (let badSku of alertData) {

    const alertElementSku = '<li>' + badSku + '</li>'

    alertDisplay = alertDisplay + alertElementSku;
  };

  alert.innerHTML = alertDisplay;

  for (let singleSku of listSku) {

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