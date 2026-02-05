'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');

// let link = ['2x https://www.x-kom.pl/p/6539508-monitor-led-24-gigabyte-g24f.html]']

const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);


// let listSku = [skuFromProductLinkMatcher.exec(link)[1]];



let resultToCopy = ''


generationButton.addEventListener('click', displayTest);

function displayTest() {

  let listSku = [];
  let pastedLinks = inputLinks.value
  let skuFromPastedLinks = [skuFromProductLinkMatcher.exec(pastedLinks)[1]];

  listSku.push(skuFromPastedLinks)

  console.log (listSku)

  for (let singleSku of listSku) {

    function addZero() {
      if (singleSku.length > 6 ){
        singleSku = '00' + singleSku
      }
    };

    addZero();

    const listElementSku = '<li>' + singleSku + '</li>'

    resultToCopy = resultToCopy + listElementSku;
  }

  resultSku.innerHTML = resultToCopy;

};




