'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSku = document.querySelector('.result__sku');

let listSku = ['111111', '337333', '44444', '166669'];

let html = '';

  for (let singleSku of listSku) {

    function addZero() {
      if (singleSku.length >= 6 ){
        singleSku = '00' + singleSku
      }
    };

    addZero();

    const listElementSku = singleSku + '</br>';

    html = html + listElementSku;
  }

  resultSku.innerHTML = html;