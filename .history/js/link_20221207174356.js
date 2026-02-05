const altoInputOrderNumber = document.querySelector('.alto__input__order__number');
const xkomInputOrderNumber = document.querySelector('.xkom__input__order__number');

const generationOrderLinkButton = document.querySelector('.generation__order__link__button');

const displayOrderLink = document.querySelector('.order__link');

let orderNumber = inputOrderNumber.value;


const xkomlinkBegin = 'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';
const altoLinkBegin 


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