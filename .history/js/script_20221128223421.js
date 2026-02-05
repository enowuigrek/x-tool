'use strict';

let inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');
const alert = document.querySelector('.alert');
const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);
let pastedLinks = inputLinks.value;

generationButton.addEventListener('click', generateSku);

console.log(skuFromProductLinkMatcher);

function generateSku() {

  let resultToCopy = '';
  let alertDisplay = '';

  const pastedLinks = inputLinks.value;
  const pastedSplitLinks = pastedLinks.split(/\r?\n/);
  const listSku = [];
  const alertData = [];

  console.log(pastedLinks);
  console.log(pastedSplitLinks);

  for (let singleLink of pastedSplitLinks) {

    if (parseInt(singleLink) && singleLink.length < 8 && singleLink.length > 4) {

      listSku.push(singleLink);
    // }else {
    //   // const skuFromPastedLinks = skuFromProductLinkMatcher.exec(singleLink)[1];
    //   listSku.push('<b>' + singleLink + '</b> - to chyba nie SKU!');
    }else if {
      alertData.push(singleLink);
      console.log('alert ' + alertData);
    }
  };

  for (let badSku of alertData) {

    const alertElementSku = '<li>' + badSku + '</li>'

    alertDisplay = alertDisplay + alertElementSku;
  };

  alert.innerHTML = alertDisplay;

  for (let singleSku of listSku) {

    function addZero() {
      if (parseInt(singleSku) && singleSku.length > 6 ) {
        singleSku = '00' + singleSku
      };
    };
    addZero();

    const listElementSku = '<li>' + singleSku + '</li>'

    resultToCopy = resultToCopy + listElementSku;
  };

  resultSku.innerHTML = resultToCopy;
};
