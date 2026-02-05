'use strict';

let inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');
const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);


generationButton.addEventListener('click', generateSku);

function generateSku() {

  let resultToCopy = '';

  const pastedLinks = inputLinks.value;
  const pastedSplitLinks = pastedLinks.split(/\r?\n/);
  const listSku = [];

  for ( let singleLink of pastedSplitLinks) {

    const skuFromPastedLinks = skuFromProductLinkMatcher.exec(singleLink)[1];

    listSku.push(skuFromPastedLinks);
  }

  for (let singleSku of listSku) {

    function addZero() {
      if (singleSku.length > 6 ){
        singleSku = '00' + singleSku
      }
    };
    addZero();

    const listElementSku =  <h1>SKU do skopiowania</h1>'<li>' + singleSku + '</li>'

    resultToCopy = resultToCopy + listElementSku;
  }

  resultSku.innerHTML = resultToCopy;
};




