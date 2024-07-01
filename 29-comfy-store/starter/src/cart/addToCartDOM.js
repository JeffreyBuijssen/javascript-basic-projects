import { formatPrice, getElement } from '../utils.js';

const cartItemsDOM = getElement('.cart-items')

const addToCartDOM = (cartItem) => {
    const { id, name, price, image, amout } = cartItem;
    const cartItemDOM = document.createElement('article');
    const attr = document.setAttribute('data-id');
    attr.value = ""; 
};

export default addToCartDOM;
