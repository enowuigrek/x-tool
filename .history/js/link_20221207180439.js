const altoInputOrderNumber = document.querySelector('.alto__input__order__number');
const xkomInputOrderNumber = document.querySelector('.xkom__input__order__number');

const xkomlinkBegin = 'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';
const altoLinkBegin = 'https://xkom-prod.operations.dynamics.com/?cmp=alto&mi=SalesTableDetails&SalesId=';

let xkomOrderNumber = xkomInputOrderNumber.value;
let altoOrderNumber = altoInputOrderNumber.value;

const generationOrderLinkButton = document.querySelector('.generation__order__link__button');
const displayOrderLink = document.querySelector('.order__link');

const checkOrderNumber = (orderNumber) => {

  if (orderNumber.length == 12) {
    return true
  } else {
    'To nie jest numer zamówienia'

}

const orderLinkGenerator = (linkBegin, orderNumber) => {

  let resultOrderLink = '';
  let orderLink = linkBegin + orderNumber;
  //usuwanie spacji
  orderNumber = orderNumber.replace(/ /g, '');

  if (orderNumber.length == 12) {

    const listElementOrderLink = `<a href=" ${orderLink} target="_blank"> ${orderNumber} </a>`

    resultOrderLink += listElementOrderLink;

    displayOrderLink.innerHTML = resultOrderLink;
  }
  else {
    displayOrderLink.innerHTML = 'To nie jest numer zamówienia'
  }
};

generationOrderLinkButton .addEventListener('click', orderLinkGenerator);