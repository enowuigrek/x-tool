'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSKU = document.querySelector('.result__sku');


let listSKU = ['111111', '337333', '447444', '166669'];

let html = '';

  for (let singleSKU of listSKU) {

    function addZero() {
      if (singleSKU.length >= 6 ){
        singleSKU = '00' + singleSKU
      }
    };

    addZero();

    const listElementSKU = '<li>' + singleSKU + '</li>'

    html = html + listElementSKU;
  }

  resultSKU.innerHTML = html;

  console.log(html);