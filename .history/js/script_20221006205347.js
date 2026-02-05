let sku = '1234567';

let splitSku = sku.split('');

let skuLenght = splitSku.length;


console.log(skuLenght);

function addZeros(splitSku){
  if (splitSku.length >= 6 ){
    splitSku = '0, 0,' + splitSku;
  }
}

addZeros(12345678);

console.log(splitSku);


// console.log(splitSku);

