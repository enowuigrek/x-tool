const inputOrderNumber = document.querySelector('.input__order__number');
const generationOrderLinkButton = document.querySelector('.generation__order__link__button');
const displayOrderLink = document.querySelector('.order__link');

const xkomlinkBegin = 'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';
let orderNumber = inputOrderNumber.value;
let resultOrderLink = '';

const orderLinkGenerator = (linkBegin, orderNumber) => {

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