'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSKU = document.querySelector('.result__sku');


// let productSKU = '123456';


let listSKU = ['111111', '33333', '44444', '166669']

for (let productSKU of listSKU) {

  const skuIdId = productSKU.getAttribute('id');

  function addZero() {
    if (productSKU.length >= 6 ){
      productSKU = '00' + productSKU
    }
  };

  addZero();

  let oneSKU = '<li>' + productSKU + '</li>'

  resultSKU.innerHTML = oneSKU;

}
