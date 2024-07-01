import { getElement } from '../utils.js';

const openCart = () => {
    getElement('.cart-overlay').classList.add('show');
};

const closeCart = () => {
    if(getElement('.cart-overlay').classList.contains("show"))
    getElement('.cart-overlay').classList.remove('show');
};

getElement(".toggle-container").addEventListener("click", openCart);
getElement(".cart-close").addEventListener('click', closeCart);

export { openCart };