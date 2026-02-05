'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSKU = document.querySelector('.result__sku');

console.log(inputLinks);
console.log(generationButton);
console.log(resultSKU);

let listSKU = ['111111', 33333, 44444, 66669]

let productSKU = '123456';

addZero();

console.log(productSKU)

let oneSKU = '<li>' + productSKU + '</li>'

resultSKU.innerHTML = oneSKU;

function addZero() {
  if (productSKU.length >= 6 ){
    productSKU = '00' + productSKU
  }
};