import { getElement } from '../utils.js';
import display from '../displayProducts.js';

import { store } from '../store.js';

const companiesContainer = getElement('.companies');
const productsContainer = getElement('.products-container');
let companies = [];

const setupCompanies = () => {
    // add all companies to list of companies
    companies = [];
    companies.push('all');
    store.forEach((product) => {
        if (!companies.includes(product.company))
        companies.push(product.company);
    });
    // display all companies in the company list element
    companiesContainer.innerHTML =companies.map((comp) => {
                return `<button class="company-btn">${comp}</button>`
    }).join('');
    // add an event listener to listen for click events
    companiesContainer.addEventListener('click', onCompanyClick);
};


const onCompanyClick = (event) => {

    const filter = event.target.textContent;
    // Default case, display all products
    if (!filter || filter === 'all') {
        display(store, productsContainer, true);
        return;
    } 

    // if a filter (other than all (default)) is found, apply filter
    const filteredProducts = store.filter((product) => product.company === filter)
    display(filteredProducts, productsContainer, true);
};

export default setupCompanies;
