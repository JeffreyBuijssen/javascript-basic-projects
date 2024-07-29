import { formatPrice, getElement } from '../utils.js';

const cartItemsDOM = getElement('.cart-items')
const totalElement = getElement('.cart-total');
const cartItemCount = getElement('.cart-item-count')


const addToCartDOM = (cartItem) => {
    const { id, name, price, image, amount } = cartItem;

    // Look for existing cart item with id===id;
    let cartItemDOM = Array.from(cartItemsDOM.children).filter(child => child.getAttribute("data-id") === id)[0];

    // if no such cart Item exists, create a new cart item
    if (!cartItemDOM) {
        cartItemDOM = document.createElement('article');
        const attr = document.createAttribute('data-id');
        attr.value = id;
        cartItemDOM.setAttributeNode(attr);
        cartItemDOM.classList.add("cart-item");
        cartItemsDOM.appendChild(cartItemDOM);
    }
    // set/update inner html of cart Item
    cartItemDOM.innerHTML = `
    <img class="cart-item-img" src="${image}" alt="${name}">
    <div>
      <h4 class="cart-item-name">${name}</h4>
      <p class="cart-item-price">${formatPrice(price)}</p>
      <button class="cart-item-remove-btn" data-id="${id}">remove</button>
    </div>
    <div>
      <button class="cart-item-increase-btn" data-id="${id}">
        <i class="fas fa-chevron-up"></i>
      </button>
      <p class="cart-item-amount data-id="${id}">${amount}</p>
      <button class="cart-item-decrease-btn" data-id="${id}">
        <i class="fas fa-chevron-down"></i>
      </button>
    </div>
    `;
}

const removeFromCartDOM = (cartItem) => {
    const { id, amount } = cartItem;
    const cartItemDOM = Array.from(cartItemsDOM.children)
        .filter((item) => item.getAttribute('data-id') === id)[0];

    // if new amount === 0 => remove from DOM
    if (amount === 0) {
        cartItemsDOM.removeChild(cartItemDOM);
        return;
    }

    // change the label with class .cart-item-amount to new amount
    cartItemDOM.querySelector('.cart-item-amount').textContent = amount;
}

const updateCartCountDOM = (newCount) => {
    cartItemCount.textContent = newCount;
}

const updateTotalDOM = (newTotal) => {
    totalElement.textContent = newTotal;
}


export { addToCartDOM, removeFromCartDOM, updateCartCountDOM, updateTotalDOM };
