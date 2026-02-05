let sku = '123456';
let skuLenght = sku.length;

console.log(skuLenght);

function addZeros(){
  if (skuLenght >= 6 ){
    sku = '00' + sku
  }
}

addZeros();

console.log(sku);


