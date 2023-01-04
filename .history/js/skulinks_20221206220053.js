const inputLinks = document.querySelector('.input__links');
const generationSkuFromLinksButton = document.querySelector('.generation__sku__from__links__button');
const dispaySkuToCopyFromLinks = document.querySelector('.sku__to__copy__from__links');

const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);

let generateSkuFromLinks = () => {

  const inputText = inputLinks.value;
  const splitInputTextArray = inputText.split(/\r?\n/);

  const listCorrectSku = [];

  let resultskuToCopyFromLinks = '';

  for (let pieceOfInputText of splitInputTextArray) {

      console.log(pieceOfInputText

    if (pieceOfInputText.length > 30) {
      const skuFrominputText = skuFromProductLinkMatcher.exec(pieceOfInputText)[1];
      listCorrectSku.push(skuFrominputText);

      if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {
        let singleSkuToCopyFromLinks = pieceOfInputText;
        listCorrectSku.push(singleSkuToCopyFromLinks);
      }
    }
  };

  for (let singleSku of listCorrectSku) {

    let resultSingleSku = addZero(singleSku);
    const listElementSku = resultSingleSku + '</br>'
    resultskuToCopyFromLinks += listElementSku;
  };
  dispaySkuToCopyFromLinks.innerHTML = resultskuToCopyFromLinks;
};
  generationSkuFromLinksButton.addEventListener('click', generateSkuFromLinks);