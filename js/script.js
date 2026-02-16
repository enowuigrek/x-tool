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
const hamburgerBtn = document.getElementById('hamburgerButton');

const listSkuBtn = document.getElementById('list_sku_btn');
const linkSkuBtn = document.getElementById('link_sku_btn');
const orderLinkBtn = document.getElementById('order_link_btn');
const enigmaBtn = document.getElementById('enigma_btn');

//Close Buttons
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
    if (!sku) return undefined;
    // Usuń wszystkie nie-cyfry
    sku = String(sku).replace(/\D/g, '');

    // Sprawdź długość
    if (sku.length >= 5 && sku.length <= 9) {
        return sku;
    }
    return undefined;
};

const tryItIfYouCantFind = (input) => {
    const digitGroups = input.match(/\b\d{5,9}\b/g);
    if (digitGroups) {
        digitGroups.forEach((group) => {
            listSkuArr.push(checkSku(group));
        });
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

//-------- Aside --------
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

//-------- TOOLS --------
// SKU finder
const findSkuInMessage = (input) => {
    const inputWords = input.replace(/^\s+|\s+$/g, '').split(/\s+/);
    const searchWords = ['x-kom:', 'xkom:', 'sku:', 'sku', 'x', 'code:'];

    inputWords.forEach((word, index) => {
        // 1. Obsługa linków B2B x-kom.pl (sprawdzamy NAJPIERW - wyższy priorytet)
        if (word.includes('b2b.x-kom.pl') && word.includes('/Index/')) {
            const skuFromB2BLink = /\/Index\/(\d+)/;
            const match = skuFromB2BLink.exec(word);
            if (match) {
                listSkuArr.push(checkSku(match[1]));
            }
        }
        // 2. Obsługa standardowych linków x-kom.pl/p/
        else if (word.includes('x-kom.pl/p/')) {
            const skuFromLink = /\/p\/(\d+)/;
            const match = skuFromLink.exec(word);
            if (match) {
                listSkuArr.push(checkSku(match[1]));
            }
        }
        // 3. Obsługa słów kluczowych
        else if (searchWords.includes(word.toLowerCase())) {
            const nextWord = inputWords[index + 1];
            if (nextWord) {
                listSkuArr.push(checkSku(nextWord.replace(/\D+$/g, '')));
            }
        }
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

//-------- Render in HTML --------
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

//-------- Event Listeners --------
//Buttons
listSkuBtn.addEventListener('click', asList);
linkSkuBtn.addEventListener('click', asLink);
orderLinkBtn.addEventListener('click', renderOrderLink);
enigmaBtn.addEventListener('click', decipher);

//Aside Options
const toggleTool = (option, tool) => {
    option.classList.toggle('on');
    if (option.classList.contains('on')) {
        tool.classList.remove('no_display');
    } else {
        tool.classList.add('no_display');
    }
};

skuOption.addEventListener('click', () => toggleTool(skuOption, findSku));
orderOption.addEventListener('click', () => toggleTool(orderOption, order));
enigmaOption.addEventListener('click', () => toggleTool(enigmaOption, enigma));

//Close
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

//Clear
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

//Copy
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
