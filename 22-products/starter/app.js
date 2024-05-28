const productsCenter = document.querySelector(".products-center");
const url = 'https://www.course-api.com/javascript-store-products';

const fetchProducts = async () => {
    try {
        const loadingElement = `<div class="loading"></div>`;
        productsCenter.innerHTML = loadingElement;
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "learning App",
            },
        });
        if (!response.ok) {
            throw new Error("Something went wrong with the fetch.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error: ${error.message}`);
        productsCenter.innerHTML =
          `<p class="error"> 
            There was an error.
          </p>`;
    }
}

function displayProducts(list) {
    const products = list.map((product) => {
        const { id } = product
        const { name: title, price} = product.fields;
        const { url:img} = product.fields.image[0];
        const formatPrice = price / 100;
        return `<a class="single-product" href="product.html?id=${id}&name=john&age=25">
          <img src="${img}" alt="" class="single-product-img img">
          <footer>
            <h5 class="name">${title}</h5>
            <span class="price">$${formatPrice}</span>
          </footer>
        </a>`;
    }).join("");
    productsCenter.innerHTML =
        `<div 
          class="products-container">
            ${products}
          </div>`;
}

const start = async () => {
    const products = await fetchProducts();
    displayProducts(products);
}

start();