'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');

let link = 'https://www.x-kom.pl/p/653508-monitor-led-24-gigabyte-g24f.html'

let cut = link.split('/-');

console.log(cut);



let listSku = ['111111', '337333', '44744', '166669'];

let resultToCopy = '';


  for (let singleSku of listSku) {

    function addZero() {
      if (singleSku.length >= 6 ){
        singleSku = '00' + singleSku
      }
    };

    addZero();

    const listElementSku = '<li>' + singleSku + '</li>'

    resultToCopy = resultToCopy + listElementSku;
  }

  resultSku.innerHTML = resultToCopy;