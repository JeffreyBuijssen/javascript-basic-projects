// when using a different script
// make sure the importing script is referenced AFTER the source
// when referencing them in the HTML
let filteredProducts = [...products];
const productsContainer = document.querySelector(".products-container");
const inputForm = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

function displayProducts() {
    if (filteredProducts.length < 1) {
        productsContainer.innerHTML = `<h6>Sorry, no products matched your search</h6>`;
        return;
    }
    productsContainer.innerHTML = filteredProducts.map((product) => {
        const { id, title, image, price } = product;
        //if (product.company == filter) {
        return `<article class="product" data-id="${id}">
                    <img
                      src="${image}" 
                      alt="${product.company}-${title}"
                      class="product-img img"/>
                      <footer>
                        <h5 class="product-name">${title}</h5>
                        <span class="product-price">€${price}<span>
                      </footer>
                </article>`;
        //}
    }).join('');
}
displayProducts();


searchInput.addEventListener("keyup", () => {
    const inputValue = searchInput.value;

    filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(inputValue);
    });
    displayProducts();
});

const companiesDOM = document.querySelector(".companies");
function displayButtons() {
    /*const currentComps = [];
    *//*const companies = products.filter((product, tempComps) => {
        console.log(!tempComps.contains(product.company));
        return !tempComps.contains(product.company);
    });*//*
    const companies = products.map((product) => {
        console.log(currentComps.includes(product.company));
        if (!currentComps.includes(product.company)) {
            currentComps.push(product.company);
            return product.company;
        }
    })
    console.log(companies);
    companiesDOM.innerHtml = companies.map((company, index) => {
        return `<button 
                    class="company-btn"
                    data-id=${company}>
                        ${company}
                </button>`;
    }).join('');*/
    const buttons = [
        'all',
        ...new Set(products.map((product) => product.company)),
    ];

    companiesDOM.innerHTML = buttons.map((company) => {
        return `<button 
                  class="company-btn btn"
                  data-id="${company}">
                  ${company} </button>`;
    }).join('');
};
displayButtons();

// filter based on Company

companiesDOM.addEventListener("click", (event) => {
    if (event.target.classList.contains("company-btn")) {
        const btn = event.target;
        if (btn.dataset.id == "all") {
            filteredProducts = products.slice();
        } else {
            filteredProducts = products.filter((product) => {
                return btn.dataset.id == product.company;
            });
        }
        searchInput.value = "";
        displayProducts();
    }
});