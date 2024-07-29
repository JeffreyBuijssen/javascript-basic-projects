import { getElement } from '../utils.js';
const cartOverlay = getElement('.cart-overlay');

const openCart = () => {
    if (!cartOverlay.classList.contains('show'))
        cartOverlay.classList.add('show');
};

const closeCart = () => {
    if (cartOverlay.classList.contains("show"))
    cartOverlay.classList.remove('show');
};

getElement(".toggle-container").addEventListener("click", openCart);
getElement(".cart-close").addEventListener('click', closeCart);

export { openCart };