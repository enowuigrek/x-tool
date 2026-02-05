'use strict';

const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');


let listSKU = ['111111', '33333', '44444', '166669'];

let html = '';



  for (let productSKU of listSKU) {

    const resultSKU = document.querySelector('.result__sku');

    // function addZero() {
    //   if (productSKU.length >= 6 ){
    //     productSKU = '00' + productSKU
    //   }
    // };

    // addZero();


    const listElementSKU = '<li>' + productSKU + '</li>'


    html = html + listElementSKU;

    console.log(html);

    resultSKU.innerHTML = html;


  }