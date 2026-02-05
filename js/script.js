'use strict';

//Inputs
const inputMessage = document.getElementById('input_message');
const inputOrderNumber = document.getElementById('input_order_number');

//Buttons
const listSkuBtn = document.getElementById('list_sku_btn');
const linkSkuBtn = document.getElementById('link_sku_btn');
const orderLinkBtn = document.getElementById('order_link_btn');

//Copy Button
const copySkuBtn = document.getElementById('copy_sku');

//Clear Buttons
const clearMessageInputBtn = document.getElementById('clear_message');
const clearOrderInputBtn = document.getElementById('clear_order');

//Result
const resultSku = document.getElementById('result_sku');
const numberSku = document.getElementById('number_sku');
const resultOrderLink = document.getElementById('result_order_link');

let listSkuArr = [];
let resultList = '';
let resultLink = '';

//
const clearlistSku = (arr) => {
    resultList = '';
    resultLink = '';
    arr.length = 0;
};
const delateDuplicateAndUndefined = () => {
    listSkuArr = [...new Set(listSkuArr)];
    listSkuArr = listSkuArr.filter((item) => item !== undefined);
};
const checkSku = (sku) => {
    //remove zero
    sku = Number(sku);
    sku = String(sku);
    //ad zero if length is 7
    if (sku.length >= 5 && sku.length <= 6) {
        return sku;
    } else if (sku.length == 7) {
        return '00' + sku;
    }
};
const copySku = (result) => {
    if (
        result.textContent.includes('Nie znalazłem SKU w tym tekście') ||
        result.textContent.includes('Lista na stronie')
    )
        return;

    result.classList.add('copied');
    let selObj = window.getSelection();
    selObj.selectAllChildren(result);
    document.execCommand('copy');
    selObj.removeAllRanges();
};

// SKU finder
const findSkuInMessage = (input) => {
    const inputWords = input.replace(/^\s+|\s+$/g, '').split(/\s+/);
    const searchWords = ['x-kom:', 'xkom:', 'sku:', 'sku', 'x', 'code:'];

    inputWords.forEach((word, index) => {
        if (word.includes('https://www.x-kom.pl/p/')) {
            const skuFromLink = new RegExp(/\/p\/(\d*)/);
            listSkuArr.push(checkSku(skuFromLink.exec(word)[1]));
        } else if (searchWords.includes(word)) {
            listSkuArr.push(inputWords[index + 1].replace(/\D$/, ''));
        }
    });
};
const tryItIfYouCantFind = (input) => {
    const inputWords = input.replace(/^\s+|\s+$/g, '').split(/\s+/);

    inputWords.forEach((word) => {
        word = Math.abs(word);
        const checkedSku = checkSku(word);
        listSkuArr.push(checkedSku);
    });
};

//List and link creators
const createListSkuToCopy = (arr) => {
    resultList = arr.join('<br>');
};
const createlinkToListSku = (arr) => {
    const linkBegin = 'href=https://www.x-kom.pl/szukaj?q=';
    let skuToLink = arr.join('%2B');

    skuToLink
        ? (resultLink = `<a ${linkBegin}${skuToLink} target="_blank"> Lista na stronie </a>`)
        : (resultLink = '');
};

//
const asList = () => {
    const isLink = false;
    renderSku(isLink);
    if (inputMessage.value) {
        copySkuBtn.classList.remove('no_active');
    }
};
const asLink = () => {
    const isLink = true;
    renderSku(isLink);
    copySkuBtn.classList.add('no_active');
};

//Render in HTML
const renderSku = (isLink) => {
    clearlistSku(listSkuArr);
    findSkuInMessage(inputMessage.value);
    if (!listSkuArr.length) {
        tryItIfYouCantFind(inputMessage.value);
    }
    delateDuplicateAndUndefined();
    if (isLink) {
        createlinkToListSku(listSkuArr);
        resultSku.innerHTML = resultLink;
        numberSku.innerHTML = '';
        numberSku.classList.add('no_display');
    } else {
        createListSkuToCopy(listSkuArr);
        resultSku.innerHTML = resultList;
        if (listSkuArr.length > 1) {
            numberSku.classList.remove('no_display');
            numberSku.innerHTML = `${listSkuArr.length}`;
        } else {
            numberSku.classList.add('no_display');
            numberSku.innerHTML = '';
        }
    }
    if (!resultSku.innerHTML) {
        resultSku.innerHTML = 'Nie znalazłem SKU w tym tekście';
    }
};
const renderOrderLink = () => {
    const linkBeginXKom =
        'https://xkom-prod.operations.dynamics.com/?cmp=xkom&mi=SalesTableDetails&SalesId=';

    const linkBeginAlTo =
        'https://xkom-prod.operations.dynamics.com/?cmp=alto&mi=display:SalesTableDetails&SalesId=';

    const xKomShop = 'https://youtu.be/dQw4w9WgXcQ';

    let linkBegin = '';
    let orderLink = '';
    let orderNumber = inputOrderNumber.value.trim();

    if (orderNumber.length === 12) {
        if (orderNumber.startsWith(7)) {
            linkBegin = linkBeginXKom;
        } else if (orderNumber.startsWith(6)) {
            linkBegin = linkBeginAlTo;
        } else if (orderNumber.startsWith(9)) {
            linkBegin = xKomShop;
        } else {
            linkBegin = undefined;
        }

        orderLink = linkBegin + orderNumber;

        if (linkBegin === undefined) {
            resultOrderLink.innerHTML = 'To nie jest numer zamówienia';
        } else {
            if (linkBegin === xKomShop) {
                let resultOrderLinkHref = `<iframe width="420" height="232" src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" title="YouTube video player" frameborder="0" picture-in-picture; web-share" allowfullscreen></iframe>`;

                resultOrderLink.innerHTML = resultOrderLinkHref;
            } else {
                let resultOrderLinkHref = `<a href= ${orderLink} target="_blank"> ${orderNumber} </a>`;
                resultOrderLink.innerHTML = resultOrderLinkHref;
            }
        }
    } else if (!orderNumber) {
        resultOrderLink.innerHTML = 'Gdzie ten numer?';
    } else {
        resultOrderLink.innerHTML = 'To nie jest numer zamówienia';
    }
};

//Event Listeners
listSkuBtn.addEventListener('click', asList);
linkSkuBtn.addEventListener('click', asLink);
orderLinkBtn.addEventListener('click', renderOrderLink);

clearMessageInputBtn.addEventListener('click', () => {
    if (!inputMessage.value) {
        resultSku.innerHTML = '';
        numberSku.innerHTML = '';
        numberSku.classList.add('no_display');
        copySkuBtn.classList.add('no_active');
        resultSku.classList.remove('selected');
    }
    inputMessage.value = '';
});

clearOrderInputBtn.addEventListener('click', () => {
    if (!inputOrderNumber.value) {
        resultOrderLink.innerHTML = '';
    }
    inputOrderNumber.value = '';
});

copySkuBtn.addEventListener('mousedown', () => {
    copySku(resultSku);
});
document.addEventListener('mouseup', () => {
    resultSku.classList.remove('copied');
});

//DARK MODE
const switchButton = document.querySelector('header button');
let theme = localStorage.getItem('theme');

switchButton.addEventListener('click', () => {
    if (theme === 'dark') {
        document.querySelector('body').classList.remove('dark');
        document.querySelector('body').classList.add('light');
        theme = 'light';
    } else {
        document.querySelector('body').classList.remove('light');
        document.querySelector('body').classList.add('dark');
        theme = 'dark';
    }

    localStorage.setItem('theme', theme);
});

const localStorageTheme = () => {
    if (theme === 'dark') {
        document.querySelector('body').classList.add('dark');
    }

    if (theme === 'light') {
        document.querySelector('body').classList.add('light');
    }
};

localStorageTheme();
