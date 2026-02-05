const inputLinks = document.querySelector("links__input");
const generationButton = document.querySelector("ene")





let productSKU = '123456';

function addZero(){
  if (productSKU.length >= 6 ){
    productSKU = '00' + productSKU
  }
}

addZero();

