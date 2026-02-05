const inputLinks = document.querySelector('.input__links');
const generationSkuFromLinksButton = document.querySelector('.generation__sku__from__links__button');
const dispaySkuToCopy = document.querySelector('.sku__to__copy');
const bugsFromLinks = document.querySelector('.bugs__from__links');

const skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);
  
let generateSku = () => {
  const inputText = inputSku.value;
  const splitInputTextArray = inputText.split(/\r?\n/);

  const listCorrectSku = [];
  const listWrongSku = [];

  let resultSkuToCopy = '';
  let resultWrongSku = '';

  for (let pieceOfInputText of splitInputTextArray) {
    //zmienia w number, aby pozbyć się ewentualnych zer z przodu,po zmiana z powrotem na string
    pieceOfInputText *= 1;
    pieceOfInputText += '';
    if (pieceOfInputText.length <= 7 && pieceOfInputText.length >= 4) {
      let singleSkuToCopy = pieceOfInputText;
      listCorrectSku.push(singleSkuToCopy);
    }
    else {
      let singleWrongSku = pieceOfInputText;
      listWrongSku.push(singleWrongSku);
    };
  };
  // wyciąganie SKU z linku
  // const skuFrominputText = skuFromProductLinkMatcher.exec(pieceOfInputText)[1];
  // listCorrectSku.push(skuFrominputText);
  for (let singleWrongSku of listWrongSku) {
    const listElementWrongSku = '<p>' + singleWrongSku + '</p>'
    resultWrongSku += listElementWrongSku;
  };

  dispayWrongSku.innerHTML = resultWrongSku;

  for (let singleSku of listCorrectSku) {
    let addZero = () => {
      if (singleSku.length > 6) {
        singleSku = '00' + singleSku
      };
    };
    addZero();
    const listElementSku = '<p>' + singleSku + '</p>'
    resultSkuToCopy += listElementSku;
  };
  dispaySkuToCopy.innerHTML = resultSkuToCopy;
  
  
  
  
  // wyciąganie SKU z linku
  const skuFrominputText = skuFromProductLinkMatcher.exec(pieceOfInputText)[1];
  listCorrectSku.push(skuFrominputText);