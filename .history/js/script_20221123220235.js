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
  console.log(pastedLinks);

  const pastedSplitLinks = pastedLinks.split(/\r?\n/)
  console.log(pastedSplitLinks);

  const listSku = [];

  for ( let singleLink of pastedSplitLinks) {

    const skuFromPastedLinks = skuFromProductLinkMatcher.exec(singleLink)[1];

    console.log(skuFromPastedLinks);

    listSku.push(skuFromPastedLinks);

    console.log(listSku);
  }


  // let listSku = new Array (skuFromPastedLinks);


  resultSku.innerHTML = resultToCopy;
};




