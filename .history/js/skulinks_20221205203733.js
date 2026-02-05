const inputLinks = document.querySelector('.input__links');
const generationSkuFromLinksButton = document.querySelector('.generation__sku__from__links__button');
const dispaySkuToCopyFromLinks = document.querySelector('.sku__to__copy__from__links');

const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);

let generateSkuFromLinks = () => {

  const inputText = inputLinks.value;
  const firstSplitArray = inputText.split(' ');

  for (let firstSplit of firstSplitArray){

  }


  

  for (let singleSku of listCorrectSku) {
    let addZero = () => {
      if (singleSku.length > 6) {
        singleSku = '00' + singleSku
      };
    };
    addZero();
    const listElementSku = '<p>' + singleSku + '</p>'
    resultskuToCopyFromLinks += listElementSku;
  };
  dispaySkuToCopyFromLinks.innerHTML = resultskuToCopyFromLinks;
};
  generationSkuFromLinksButton.addEventListener('click', generateSkuFromLinks);