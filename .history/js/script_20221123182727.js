'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');

// let link = ['2x https://www.x-kom.pl/p/6539508-monitor-led-24-gigabyte-g24f.html]']

const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);
let resultToCopy = ''

generationButton.addEventListener('click', generateSku);

function generateSku() {

  const pastedLinks = inputLinks.value
  const skuFromPastedLinks = skuFromProductLinkMatcher.exec(pastedLinks)[2];

  const listSku = [];
  listSku.push(skuFromPastedLinks);

  // let listSku = new Array (skuFromPastedLinks);

  for (let singleSku of listSku) {

    // function addZero() {
    //   if (singleSku.length > 6 ){
    //     singleSku = '00' + singleSku
    //   }
    // };

    addZero();

    const listElementSku = '<li>' + singleSku + '</li>'

    resultToCopy = resultToCopy + listElementSku;
  }

  resultSku.innerHTML = resultToCopy;
};




