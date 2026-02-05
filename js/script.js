'use strict';

//Aside
const aside = document.querySelector('aside');
const options = document.querySelector('.options');
const skuOption = document.getElementById('sku_option');
const orderOption = document.getElementById('order_option');
const enigmaOption = document.getElementById('enigma_option');

//Tools
const findSku = document.getElementById('find_sku');
const order = document.getElementById('order');
const enigma = document.getElementById('enigma');

//Inputs
const inputMessage = document.getElementById('input_message');
const inputOrderNumber = document.getElementById('input_order_number');
const inputOTRS = document.getElementById('input_otrs');

//Buttons
const listSkuBtn = document.getElementById('list_sku_btn');
const linkSkuBtn = document.getElementById('link_sku_btn');
const orderLinkBtn = document.getElementById('order_link_btn');
const enigmaBtn = document.getElementById('enigma_btn');
const hamburgerBtn = document.getElementById('hamburgerButton');
const closeSkuBtn = document.getElementById('close_sku');
const closeOrderBtn = document.getElementById('close_order');
const closeEnigmaBtn = document.getElementById('close_enigma');

//Copy Button
const copySkuBtn = document.getElementById('copy_sku');

//Clear Buttons
const clearMessageInputBtn = document.getElementById('clear_message');
const clearOrderInputBtn = document.getElementById('clear_order');
const clearOTRSInputBtn = document.getElementById('clear_otrs');

//Result
const resultSku = document.getElementById('result_sku');
const numberSku = document.getElementById('number_sku');
const resultOrderLink = document.getElementById('result_order_link');
const resultOTRS = document.getElementById('result_otrs');

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

//Aside
hamburgerBtn.addEventListener('click', function () {
    const main = document.querySelector('main');

    main.classList.toggle('main_open');
    aside.classList.toggle('open');
    hamburgerBtn.classList.toggle('open');
    if (options.classList.contains('display_options')) {
        options.classList.remove('display_options');
    } else {
        setTimeout(function () {
            options.classList.add('display_options');
        }, 200);
    }
});

// SKU finder
const findSkuInMessage = (input) => {
    const inputWords = input.replace(/^\s+|\s+$/g, '').split(/\s+/);
    const searchWords = ['x-kom:', 'xkom:', 'sku:', 'sku', 'x', 'code:'];

    inputWords.forEach((word, index) => {
        if (word.includes('https://www.x-kom.pl/p/')) {
            const skuFromLink = new RegExp(/\/p\/(\d*)/);
            listSkuArr.push(checkSku(skuFromLink.exec(word)[1]));
        } else if (searchWords.includes(word)) {
            listSkuArr.push(checkSku(inputWords[index + 1].replace(/\D$/, '')));
        }
    });
};
const tryItIfYouCantFind = (input) => {
    const inputWords = input.replace(/^\s+|\s+$/g, '').split(/\s+/);

    inputWords.forEach((word) => {
        listSkuArr.push(checkSku(Math.abs(word.replace(/\D$/, ''))));
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

// List or link
const asList = () => {
    const isLink = false;
    renderSku(isLink);
    if (resultSku.innerHTML != 'Nie znalazłem SKU w tym tekście') {
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
                inputOrderNumber.value = '';
            }
        }
    } else if (!orderNumber) {
        resultOrderLink.innerHTML = 'Gdzie ten numer?';
    } else {
        resultOrderLink.innerHTML = 'To nie jest numer zamówienia';
    }
};

const decipher = () => {
    let text = inputOTRS.value;
    text = text.replace(/\\n/g, '<br>');
    text = text.replace(/\\r/g, '');
    resultOTRS.innerHTML = text;
};

//Event Listeners
listSkuBtn.addEventListener('click', asList);
linkSkuBtn.addEventListener('click', asLink);
orderLinkBtn.addEventListener('click', renderOrderLink);
enigmaBtn.addEventListener('click', decipher);

skuOption.addEventListener('click', () => {
    skuOption.classList.toggle('on');

    if (skuOption.classList.contains('on')) {
        findSku.classList.remove('no_display');
        // setTimeout(function () {
        //     findSku.classList.remove('tool_hide');
        // });
    } else {
        findSku.classList.add('tool_hide');
        // setTimeout(function () {
            findSku.classList.add('no_display');
        // }, 200);
    }
});
orderOption.addEventListener('click', () => {
    orderOption.classList.toggle('on');
    if (orderOption.classList.contains('on')) {
        order.classList.remove('no_display');
        // setTimeout(function () {
        //     order.classList.remove('tool_hide');
        // });
    } else {
        order.classList.add('tool_hide');
        // setTimeout(function () {
            order.classList.add('no_display');
        // }, 200);
    }
});
enigmaOption.addEventListener('click', () => {
    enigmaOption.classList.toggle('on');
    if (enigmaOption.classList.contains('on')) {
        enigma.classList.remove('no_display');
        // setTimeout(function () {
        //     enigma.classList.remove('tool_hide');
        // });
    } else {
        enigma.classList.add('tool_hide');
        // setTimeout(function () {
            enigma.classList.add('no_display');
        // }, 200);
    }
});

closeSkuBtn.addEventListener('click', () => {
    skuOption.classList.remove('on');
    findSku.classList.add('no_display');
});

closeOrderBtn.addEventListener('click', () => {
    orderOption.classList.remove('on');
    order.classList.add('no_display');
});

closeEnigmaBtn.addEventListener('click', () => {
    enigmaOption.classList.remove('on');
    enigma.classList.add('no_display');
});

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

clearOTRSInputBtn.addEventListener('click', () => {
    if (!inputOTRS.value) {
        resultOTRS.innerHTML = '';
    }
    inputOTRS.value = '';
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
