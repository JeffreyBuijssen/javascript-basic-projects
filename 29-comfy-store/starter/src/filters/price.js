import { getElement } from '../utils.js';
import display from '../displayProducts.js';

import { store } from '../store.js';

const priceInput = getElement('.price-filter');
const priceValue = getElement('.price-value');
const productsContainer = getElement('.products-container');


const setupPrice = () => {
    let min = 1000000, max = 0;

    // find min and max
    store.forEach((product) => {
        if (product.price/100 < min) min = product.price / 100;
        if (product.price/100 > max) max = product.price / 100;
    });
    // set min, max and current
    priceInput.max = Math.ceil(max);
    priceInput.min = Math.floor(min);
    priceInput.value = priceInput.max;
    //updatePriceFilter();
};

const passThroughPriceFilter = (products, value) => {
    const filteredProducts = products.filter((product) => product.price <= value)
    display(filteredProducts, productsContainer, true);
    if (filteredProducts.length < 1) {
        productsContainer.innerHTML = `<h3> Sorry no products matching your filter were found (value: €${value/100}).</h3>`;
    }
    //display(filteredProducts, productsContainer, 'price');
    return filteredProducts;
}

export default setupPrice;


const updatePriceFilter = () => {
    priceValue.textContent = `Value: €${priceInput.value}`;
    passThroughPriceFilter(store, priceInput.value * 100);
}

window.addEventListener('DOMContentLoaded', () => {
    priceInput.addEventListener('input', updatePriceFilter);
});

// When unloading the page
window.addEventListener('visibilitychange', () => {
    // unregister to eventListener
    if (document.visibilityState === 'hidden') {
        priceInput.removeEventListener('input', updatePriceFilter);
    }
});