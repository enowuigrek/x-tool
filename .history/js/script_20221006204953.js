let sku = '123456';

let splitSku = sku.split('');

console.log(splitSku.length);
console.log(splitSku.length);

function addZeros(splitSku){
  if (splitSku >= 6 ){
    splitSku = '0, 0,' + splitSku;
  }
}

addZeros(sku);


// console.log(splitSku);

