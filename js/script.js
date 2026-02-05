let sku = '123456';

function addZeros(){
  if (sku.length >= 6 ){
    sku = '00' + sku
  }
}

addZeros();

console.log(sku);


