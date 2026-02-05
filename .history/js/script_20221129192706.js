'use strict';

let inputLinks = document.querySelector('.input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');
const alert = document.querySelector('.alert');
const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);
let pastedLinks = inputLinks.value;

generationButton.addEventListener('click', generateSku);

function generateSku() {

  let resultToCopy = '';
  let alertDisplay = '';

  const pastedLinks = inputLinks.value;
  // const pastedSplitLinks = pastedLinks.split(' ');
  const pastedSplitLinks = pastedLinks.split(/\r?\n/);
  const listSku = [];
  const alertData = [];

  for (let singleLink of pastedSplitLinks) {

    singleLink = singleLink * 1;

    if (singleLink.length <= 7 && singleLink.length >= 4) {
      listSku.push(singleLink);
    }
    // narazie zakomentowane wyciąganie SKU z linku
    // else if (!null){
    //   const skuFromPastedLinks = skuFromProductLinkMatcher.exec(singleLink)[1];
    //   listSku.push(skuFromPastedLinks);
    // }
    else {
      alertData.push(singleLink);
    }
  };

  console.log(listSku);

  for (let badSku of alertData) {

    const alertElementSku = '<li>' + badSku + '</li>'

    alertDisplay = alertDisplay + alertElementSku;
  };

  alert.innerHTML = alertDisplay;

  for (let singleSku of listSku) {

    function addZero() {
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
