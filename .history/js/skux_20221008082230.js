javascript:

let skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);
let productListItems = document.getElementsByClassName('productListItem');
let finalList = [];
let result = undefined;

for (let i = 0; i < productListItems.length; i++) {

  let quantityDropdown = productListItems[i].querySelector("span[role='option']");
  let productLink = productListItems[i].querySelector("a[href]").getAttribute('href');
  let productSKU = skuFromProductLinkMatcher.exec(productLink)[1];
  let productQuantity;

  if (productSKU.length >= 7 ){
    productSKU = '00' + productSKU
  }

  if (quantityDropdown !== null) {
    productQuantity = quantityDropdown.textContent;
  } else {
    productQuantity = productListItems[i].querySelector('.disabledDropdownInputAmount').textContent;

  } finalList[i] = {
    sku: productSKU, quantity: productQuantity
  }
}

for (let i = 0; i < finalList.length; i++) {

  for (let j = 0; j < finalList[i].quantity; j++) {

    if (!result) {
      result = finalList[i].sku;

    } else {
      result = result +'\n'+ finalList[i].sku;
    }
  }
}

alert(result);