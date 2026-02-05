let sku = '123456';
// let splitSku = sku.split('');
let skuLenght = sku.length;

console.log(skuLenght);

function addZeros(){
  if (skuLenght >= 6 ){
    sku = '00' + sku
  }
}

addZeros();

console.log(sku);


// console.log(splitSku);

