import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {

    try {
        const response = await fetch(allProductsUrl);
        if (!response.ok) throw new Error("Something went wrong with the fetch Request");

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

export default fetchProducts;
