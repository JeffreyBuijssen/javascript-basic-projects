// global imports
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

const init = async () => {
    const products = await fetchProducts();
    setupStore(products);
    const featuredProducts = store.filter((product) =>
        product.featured);
    display(featuredProducts, getElement('.featured-center'));
}

window.addEventListener('DOMContentLoaded', init);