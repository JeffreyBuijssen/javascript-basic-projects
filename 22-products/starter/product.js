const productDOM = document.querySelector(".product");
const singleProductUrlPrefix = "https://www.course-api.com/javascript-store-single-product";

const fetchProduct = async () => {
    productDOM.innerHTML = `<h4 class="product-loading">Loading...</h4>`;
    try {
        const params = new URLSearchParams(document.location.search);
        const id = params.get("id");
        const fetchUrl = `${singleProductUrlPrefix}?id=${id}`;
        const response = await fetch(fetchUrl, {
            headers: {
                "Accept-Content": "application/json",
                "User-Agent": "learning App",
            }
        });

        if (!response.ok) throw new Error("problem occured fetching Product");

        return await response.json();
    } catch (error) {
        console.log(`Error: ${error}`);
        productDOM.innerHTML = "<p class='error'> There was a problem loading the product. Please try again later </p>";
    }
};

function displayProduct(product) {
    const { id } = product;
    const { name: title, colors, company, price, description } = product.fields;
    const { url: img } = product.fields.image[0];
    document.title = title.toUpperCase();

    // colors
    const colorList = colors.map((color) => {
        return `<span class="product-color" style="background:${color}"></span>`
    }).join('');
    const formattedPrice = price / 100;
    productDOM.innerHTML = `
        <div class="product-wrapper">
		  <img src="${img}" alt="${title}" class="img">
		  <div class="product-info">
			<h3>${title}</h3>
			<h5>${company}</h5>
			<span>$${formattedPrice}</span>
			<div class="colors">
				${colorList}
			</div>
			<p>
			  ${description}
			</p>
			<button class="btn">add to cart</button>
		</div>
	</div>
    `;
}

const start = async () => {
    const productData = await fetchProduct();
    displayProduct(productData);
}


start();