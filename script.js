(function () {
    'use strict';

    const packagingBtns   = document.querySelectorAll('.packaging-btn');
    const skuValueEl      = document.getElementById('skuValue');
    const priceCurrentEl  = document.getElementById('priceCurrent');
    const priceOldEl      = document.getElementById('priceOld');
    const economyValueEl  = document.getElementById('economyValue');

    const quantityInput   = document.getElementById('quantityInput');
    const decreaseBtn     = document.getElementById('decreaseBtn');
    const increaseBtn     = document.getElementById('increaseBtn');
    const addToCartBtn    = document.getElementById('addToCartBtn');
    const cartBtnText     = addToCartBtn.querySelector('.add-to-cart-btn__text');

    const CURRENCY = '₽';

    function parsePrice(str) {
        if (!str) return 0;
        const cleaned = String(str).replace(/\s+/g, '').replace(',', '.');
        return parseFloat(cleaned) || 0;
    }

    function formatPrice(num) {
        const hasCents = num % 1 !== 0;
        return num.toLocaleString('ru-RU', {
            minimumFractionDigits: hasCents ? 2 : 0,
            maximumFractionDigits: 2
        });
    }

    function updateProductData(btn) {
        const sku      = btn.dataset.sku;
        const priceOld = btn.dataset.priceOld;
        const price    = btn.dataset.price;

        skuValueEl.textContent = sku;
        priceCurrentEl.textContent = price + ' ' + CURRENCY;
        priceOldEl.textContent     = priceOld + ' ' + CURRENCY;

        const diff = parsePrice(priceOld) - parsePrice(price);
        economyValueEl.textContent = formatPrice(diff) + ' ' + CURRENCY;
    }

    packagingBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            packagingBtns.forEach(function (b) {
                b.classList.remove('is-active');
                b.setAttribute('aria-checked', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-checked', 'true');
            updateProductData(btn);
        });
    });

    function setQuantity(val) {
        const min = parseInt(quantityInput.min, 10) || 1;
        const max = parseInt(quantityInput.max, 10) || 999;
        let num = parseInt(val, 10);
        if (isNaN(num)) num = min;
        if (num < min) num = min;
        if (num > max) num = max;
        quantityInput.value = String(num);
    }

    decreaseBtn.addEventListener('click', function () {
        setQuantity(parseInt(quantityInput.value, 10) - 1);
    });

    increaseBtn.addEventListener('click', function () {
        setQuantity(parseInt(quantityInput.value, 10) + 1);
    });

    quantityInput.addEventListener('input', function () {
        setQuantity(quantityInput.value);
    });

    quantityInput.addEventListener('blur', function () {
        setQuantity(quantityInput.value);
    });

    addToCartBtn.addEventListener('click', function () {
        addToCartBtn.classList.add('is-added');
        cartBtnText.textContent = 'Добавлено!';

        setTimeout(function () {
            addToCartBtn.classList.remove('is-added');
            cartBtnText.textContent = 'В корзину';
        }, 2000);
    });

})();
