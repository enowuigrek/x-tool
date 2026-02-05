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
  const pastedSplitLinks = inputText.split(/\r?\n/);
  const listSku = [];
  const alertData = [];

  console.log(inputText);

  for (let singleLink of pastedSplitLinks) {

    //zmiena w number, aby pozbyć się ewentualnych zer z przodu, po zmiana z powrotem na string
    singleLink *= 1;
    singleLink += '';

    if (singleLink.length <= 7 && singleLink.length >= 4) {
      listSku.push(singleLink);
    }
    // narazie zakomentowane wyciąganie SKU z linku
    // else if (!null){
    //   const skuFrominputText = skuFromProductLinkMatcher.exec(singleLink)[1];
    //   listSku.push(skuFrominputText);
    // }
    else {
      alertData.push(singleLink);
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