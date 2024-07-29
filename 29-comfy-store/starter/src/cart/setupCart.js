// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import {
    addToCartDOM,
    removeFromCartDOM,
    updateCartCountDOM,
    updateTotalDOM
} from './addToCartDOM.js';
// set items

let cart = [];
let itemsCount = 0;

const cartItems = getElement('.cart-items');
const checkoutBtn = getElement('.cart-checkout');
//const totalElement = getElement('.cart-total');
//const cartItemCount = getElement('.cart-item-count')

function init() {
    cart = Array.from(getStorageItem('cart'));
    cart.forEach((cartItem) => {
        addToCartDOM(cartItem);
        itemsCount += cartItem.amount;
    });
    updateCountAndTotal();
}

export const addToCart = (id) => {
    console.log(id);
    openCart();
    const product = findProduct(id);
    let cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        amount: 0,
    };

    // if cart is empty, or item isn't in cart yet.
    if (cart.length === 0 || !cart.find((item) => item.id === id)) {
        cartItem.amount = 1;
        cart.push(cartItem);
    } else {
        cartItem = cart.find((item) => item.id === id);
        cartItem.amount++;
    }
    itemsCount++;
    updateCountAndTotal();
    addToCartDOM(cartItem);
    setStorageItem('cart', cart);
};

const removeFromCart = (id) => {
    const product = findProduct(id);
    let cartItem = {
        id: id,
        name: product.name,
        price: product.price,
        image: product.image,
        amount: 1,
    };

    // can assume cart isn't empty, since this can only be called on items in the cart
    cartItem = cart.find((item) => item.id === id);
    cartItem.amount--;
    itemsCount--;
    updateCountAndTotal();
    if (cartItem.amount === 0) {
        cart.pop(cartItem);
    }
    setStorageItem('cart', cart);
    removeFromCartDOM(cartItem);
}

function updateCountAndTotal() {
    let count = 0;
    let total = 0;
    cart.forEach((child) => {
        count += child.amount;
        total += child.amount * child.price;
    });
    updateCartCountDOM(count);
    updateTotalDOM(formatPrice(total));
}

document.addEventListener('DOMContentLoaded', init);

cartItems.addEventListener('click', (e) => {
    /*console.log(e.target.parentElement);
    console.log(e.target);*/
    const targetBtn = e.target.tagName === 'BUTTON' ? e.target : e.target.parentElement;

    if (targetBtn.tagName !== 'BUTTON') return;
    const id = targetBtn.getAttribute('data-id');
    switch (targetBtn.className) {
        case 'cart-item-increase-btn':
            addToCart(id);
            //increaseItemAmount(id);
            break;
        case 'cart-item-remove-btn':
        case 'cart-item-decrease-btn':
            removeFromCart(id);
            break;
    }
});
