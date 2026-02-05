'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');

// let link = ['2x https://www.x-kom.pl/p/6539508-monitor-led-24-gigabyte-g24f.html], https://www.x-kom.pl/p/653508-monitor-led-24-gigabyte-g24f.html']

// const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);
// console.log(skuFromProductLinkMatcher)

// let listSku = [skuFromProductLinkMatcher.exec(link)[1]];
// console.log(listSku);

let resultToCopy = ''


generationButton.addEventListener('click', displayTest);

function displayTest() {

  listSku.push(inputLinks.value)
  console.log(listSku);

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




