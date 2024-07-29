import { getElement } from '../utils.js';
import display from '../displayProducts.js';
import { store }  from '../store.js'

const productContainer = getElement('.products-container');
const searchInput = getElement('.search-input');

const setupSearch = () => {
    const unfilteredProducts = store;
    searchInput.value = '';
    //display(unfilteredProducts, productContainer, true);

    searchInput.addEventListener('input', (e) => {
        applySearchFilter( unfilteredProducts, searchInput.value)
    });
};

const applySearchFilter = (unfilteredProducts, userInput) => {

    // if input value == empty, display all products.
    if (!userInput || userInput === "") display(unfilteredProducts, productContainer, true);

    else {
    const filteredProducts = unfilteredProducts.filter((product) => 
        product.name.includes(userInput));
        if (!filteredProducts || filteredProducts.length < 1) {
            productContainer.innerHTML =
                `<h3> Sorry, no products matching your filter were found (search term: "${userInput}")`;
            return;
        }
        display(filteredProducts, productContainer, true);
    }
}

export default setupSearch;

