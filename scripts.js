function calculatePrice(character, type, 抽选) {
    let basePrice = 0;
    if (character === 'sayo' || character === 'ako') {
        if (type === '通常盘') {
            basePrice = 抽选 === '有抽选' ? 110 : 90;
        } else if (type === '限定盘A' || type === '限定盘B') {
            basePrice = 抽选 === '有抽选' ? 570 : 550;
        } else if (type === 'set') {
            basePrice = 抽选 === '有抽选' ? 1220 : 1160;
        }
    } else {
        if (type === '通常盘') {
            basePrice = 抽选 === '有抽选' ? 100 : 80;
        } else if (type === '限定盘A' || type === '限定盘B') {
            basePrice = 抽选 === '有抽选' ? 560 : 540;
        } else if (type === 'set') {
            basePrice = 抽选 === '有抽选' ? 1210 : 1150;
        }
    }
    return basePrice;
}

function get特典(character, type) {
    let 特典 = '';
    if (type === '通常盘') {
        特典 = 'L判生写';
    } else if (type === '限定盘A' || type === '限定盘B') {
        switch (character) {
            case 'ykn':
                特典 = '立牌+L判生写';
                break;
            case 'lisa':
                特典 = '钥匙链+L判生写+吧唧';
                break;
            case 'sayo':
            case 'ako':
            case 'rinko':
                特典 = 'L判生写+吧唧';
                break;
        }
    } else if (type === 'set') {
        特典 = 'L判生写×3+吧唧×2';
        if (character === 'lisa') {
            特典 = 'L判生写×3+钥匙链×2+吧唧×2';
        } else if (character === 'ykn') {
            特典 = 'L判生写×3+立牌×2';
        }
    }
    return 特典;
}

function updatePrice(selector) {
    const character = selector.querySelector('.character').value;
    const type = selector.querySelector('.type').value;
    const 抽选 = selector.querySelector('.抽选').value;
    const priceInput = selector.querySelector('.price');
    const 特典Input = selector.querySelector('.特典');

    if (character && type && 抽选) {
        const price = calculatePrice(character, type, 抽选);
        priceInput.value = price;

        const 特典 = get特典(character, type);
        特典Input.value = 特典;

        updateTotalPrice();
    }
}

function updateTotalPrice() {
    const priceInputs = document.querySelectorAll('.price');
    let totalPrice = 0;

    priceInputs.forEach(input => {
        totalPrice += Number(input.value);
    });

    totalPrice += 9;  // 加上邮费
    document.getElementById('total-price').textContent = totalPrice;
}

function addRow() {
    const calculator = document.getElementById('calculator');
    const newSelector = calculator.querySelector('.selector').cloneNode(true);
    
    newSelector.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => updatePrice(newSelector));
    });

    newSelector.querySelector('.price').value = '';
    newSelector.querySelector('.特典').value = '';
    calculator.appendChild(newSelector);
}

function confirmPayment() {
    const totalPrice = document.getElementById('total-price').textContent;
    localStorage.setItem('totalPrice', totalPrice); // 将总价存储在本地存储中
    window.location.href = 'confirm.html'; // 跳转到支付确认页面
}

// 为初始选择框添加事件
document.querySelectorAll('.selector select').forEach(select => {
    select.addEventListener('change', (event) => {
        updatePrice(event.target.closest('.selector'));
    });
});
