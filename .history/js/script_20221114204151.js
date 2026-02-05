'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSKU = document.querySelector('.result__sku');


// let productSKU = '123456';


let listSKU = ['111111', '33333', '44444', '166669'];

for ( let i = 0; i < listSKU.length; i++) {
  console.log(i);


  for (let productSKU of listSKU) {

    

    addZero();

    let oneSKU = '<li>' + productSKU + '</li>'

    resultSKU.innerHTML = oneSKU;
  }
}