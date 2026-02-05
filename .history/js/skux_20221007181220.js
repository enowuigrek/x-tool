javascript:

var skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);

var productListItems = document.getElementsByClassName('productListItem');

var finalList = [], result = undefined;

for (var i = 0; i < productListItems.length; i++) {
  var quantityDropdown = productListItems[i].querySelector("span[role='option']");var productLink = productListItems[i].querySelector("a[href]").getAttribute('href');var productSKU = skuFromProductLinkMatcher.exec(productLink)[1];var productQuantity;if (quantityDropdown !== null) {productQuantity = quantityDropdown.textContent;} else {productQuantity = productListItems[i].querySelector('.disabledDropdownInputAmount').textContent;}finalList[i] = { sku: productSKU, quantity: productQuantity }

}for (var i = 0; i < finalList.length; i++) {
  for (var j = 0; j < finalList[i].quantity; j++) {if (!result) {result = finalList[i].sku;} else {result = result +'\n'+ finalList[i].sku;}}}alert(result);