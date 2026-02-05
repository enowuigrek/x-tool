const inputOrderNumber = document.querySelector('.input__order__number');
const generationOrderLinkButton = document.querySelector('.generation__order__link__button');
const displayOrderLink = document.querySelector('.order__links');

console.log(displayOrderLink);

const linkBegin = 'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';

let orderLinkGenerator = () => {

  let orderNumber = inputOrderNumber.value;
  let orderLink = linkBegin + orderNumber;
  let resultOrderLink = '';

  const listElementOrderLink = '<li><href=></href="images/favicon.ico"' + orderLink + '</li>'

  resultOrderLink += listElementOrderLink;

  displayOrderLink.innerHTML = resultOrderLink;
};

generationOrderLinkButton .addEventListener('click', orderLinkGenerator);