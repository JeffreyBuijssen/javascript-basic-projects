// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
 const loading = getElement('.page-loading');
 const centerDOM = getElement('.single-product-center');
 const pageTitleDOM = getElement('.page-hero-title');
 const imgDOM = getElement('.single-product-img');
 const titleDOM = getElement('.single-product-title');
 const companyDOM = getElement('.single-product-company');
 const priceDOM = getElement('.single-product-price');
 const colorsDOM = getElement('.single-product-colors');
 const descDOM = getElement('.single-product-desc');
 const cartBtn = getElement('.addToCartBtn');

// cart product
// let productID;

// show product when page loads

const setupProduct = async () => {
    const urlParams = new URLSearchParams(document.location.search);
    const id = urlParams.get('id');
    if(!id || id === null) {
        centerDOM.innerHTML = `<h3>No ID was found</h3>`;
    }
    const completeUrl = `${singleProductUrl}?id=${id}`;
    const response = await fetch(completeUrl);
    if (!response.ok) centerDOM.innerHTML = `<h3>No product with id ${id} was found`;
    const data = await response.json();


    await displayProduct(data);

    //if (!resonse.ok) throw new error('An error occured while trying to fetch product information');
    //const data = await response.json();

    loading.style.display = 'none';
}

const displayProduct = async (data) => {
    const { id, fields } = data;
    const { name, price, company, colors, description } = fields;
    const image = fields.image[0].url;
    //console.log(fields);

    pageTitleDOM.textContent = `Home / ${name}`; 
    titleDOM.textContent = `${name}`;
    priceDOM.textContent = formatPrice(price);
    companyDOM.textContent = company;

    imgDOM.alt = name;
    imgDOM.src = image;

    // colors
    const newInnerColors = `${colors.map((color) => {
        return `<span class="product-color" style="background-color:${color};"></span>`;
    }).join('')}`;
    colorsDOM.innerHTML = newInnerColors;

    descDOM.textContent = description;

    cartBtn.setAttribute('data-id', id);

    //console.log(id);
    cartBtn.addEventListener('click', () => addToCart(id));
}



await setupProduct();

