let sku = '123456';
let splitSku = sku.split('');
let skuLenght = sku.length;

console.log(skuLenght);

function addZeros(){
  if (skuLenght >= 6 ){
    splitSku = '0,0,' + splitSku
  }
}

addZeros();

console.log(splitSku);


// console.log(splitSku);

