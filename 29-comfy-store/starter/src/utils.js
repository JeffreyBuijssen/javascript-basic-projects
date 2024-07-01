//   ATTENTION!!!!!!!!!!!
//   I SWITCHED TO PERMANENT DOMAIN
//   DATA IS THE SAME JUST A DIFFERENT URL,
//   DOES NOT AFFECT PROJECT FUNCTIONALITY

const allProductsUrl = 'https://www.course-api.com/javascript-store-products';
// temporary single product
// 'https://www.course-api.com/javascript-store-single-product?id=rec43w3ipXvP28vog'
const singleProductUrl =
  'https://www.course-api.com/javascript-store-single-product';

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exist`
  );
};

let USDollar = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
let Euro = new Intl.NumberFormat('en-NL', { style: 'currency', currency: 'EUR', });
const formatPrice = (price) => {
    return Euro.format(parseFloat(price/100));
};
const getStorageItem = (id) => {
    return localStorage.getItem(id)
        ? JSON.parse(localStorage.getItem(id))
        : [];
};
const setStorageItem = (id, value) => {
    let strigifiedItem = JSON.stringify(value);
    localStorage.setItem(id, strigifiedItem);
};

export {
  allProductsUrl,
  singleProductUrl,
  getElement,
  formatPrice,
  getStorageItem,
  setStorageItem,
};
