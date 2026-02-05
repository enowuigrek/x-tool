const inputLinks = document.querySelector('.links__input');
const generationButton = document.querySelector('.generation__button');
const resultSKU = document.querySelector('.result__sku');

console.log(inputLinks);
console.log(generationButton);
console.log(resultSKU);

let productSKU = 123456;

addZero();

let oneSKU = '<li>' + productSKU + '</li>'

resultSKU.innerText = productSKU;

function addZero() {
  if (productSKU.length >= 6 ){
    productSKU = '00' + productSKU
  }
};