'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSKU = document.querySelector('.result__sku');


// let productSKU = '123456';


let listSKU = ['111111', '33333', '44444', '166669']

for (let productSKU of listSKU) {

  function addZero() {
    if (oneSKU.length >= 6 ){
      listSKU = '00' + listSKU
    }
  };

  

  let oneSKU = '<li>' + listSKU[3] + '</li>'

  addZero();

  resultSKU.innerHTML = oneSKU;
}
