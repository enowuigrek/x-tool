const inputOrderNumber = document.querySelector('.input__order__number');
const generationOrderLinkButton = document.querySelector('.generation__order__link__button');
const displayOrderLink = document.querySelector('.order__links');

const linkBegin = 'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';

let orderLinkGenerator = () => {

  let orderNumber = inputOrderNumber.value;
  let orderLink = linkBegin + orderNumber;

  let resultOrderLink = '';

  console.log(orderLink);
  console.log(resultOrderLink);

  const listElementOrderLink = '<li>' + orderLink + '</li>'

  displayOrderLink.innerHTML = resultOrderLink;
};

generationOrderLinkButton .addEventListener('click', orderLinkGenerator);