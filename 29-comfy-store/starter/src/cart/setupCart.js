// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

let cart = getStorageItem('cart');

const cartItems = getElement('.cart-items');
const checkoutBtn = getElement('.cart-checkout');
const totalElement = getElement('.cart-total');

function init() {
    cart = getStorageItem('cart');
}



export const addToCart = (id) => {
    const product = findProduct(id);
    let cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        amount: 0,
    };
    
    if (!cart) {
        cartItem.amount = 1;
        cart = { cartItem };
        
    } else {
        const cartItem = cart.find((item) => item.id === id);
        cartItem.amount++;
    }

    addToCartDOM(cartItem);



    setStorageItem('store', cart);

};

document.addEventListener('DOMContentLoaded', init);
