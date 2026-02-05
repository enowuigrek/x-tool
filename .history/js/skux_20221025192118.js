javascript:

var skuFromProductLinkMatcher = new RegExp(/\/p\/(\d*)\-/);
var productListItems = document.getElementsByClassName('productListItem');
var finalList = [];
var result = undefined;

for (var i = 0; i < productListItems.length; i++) {

  var productLink = productListItems[i].querySelector("a[href]").getAttribute('href');
  var productSKU = skuFromProductLinkMatcher.exec(productLink)[1];

  if (productSKU.length >= 7 ){
    productSKU = '00' + productSKU
  }

  finalList[i] = {
    sku: productSKU
  }
}



    } else {
      result = result +'\n'+ finalList[i].sku;
    }
  }
}

alert(result);