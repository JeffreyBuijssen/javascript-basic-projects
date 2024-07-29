import { getStorageItem, setStorageItem } from './utils.js';
let store = getStorageItem('store');
//let store = getStorageItem('store');

const setupStore = (products) => {
    store = getStorageItem('store');
    // map products with
    // product {id, fields }
    // fields.image = img[0].thumbnails.large.url;

    // fields: featured, name, price, company, colors, image:img

    const store = products.map((product) => {
        const { id,
            fields: {
                featured, name, price, company, colors, image: img
            },
        } = product;
        const image = img[0].thumbnails.large.url;
        return { id, featured, name, price, company, colors, image };
    });

    setStorageItem('store', store);
    // store products in local storage
};
const findProduct = (id) => {
    return store.find((product) => product.id === id);
};
export { store, setupStore, findProduct };
