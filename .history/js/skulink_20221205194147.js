const inputLinks = document.querySelector('.input__links');
const generationSkuFromLinksButton = document.querySelector('.generation__sku__from__links__button');
const dispaySkuToCopy = document.querySelector('.sku__to__copy');
const dispayWrongSku = document.querySelector('.wrong__sku');

const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);
  
  
  
  
  
  
  // wyciąganie SKU z linku
  const skuFrominputText = skuFromProductLinkMatcher.exec(pieceOfInputText)[1];
  listCorrectSku.push(skuFrominputText);