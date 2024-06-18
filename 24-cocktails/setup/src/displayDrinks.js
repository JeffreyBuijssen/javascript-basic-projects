import { hideLoading} from "./toggleLoading.js";
import getElement from "./getElement.js";

function displayDrinks(data) {

    const { drinks } = data;

    const drinksHTML = drinks.map((drink) => {
        return `
        <a href="drink.html">
            <article class="cocktail" data-id="${drink.idDrink}">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <h3>${drink.strDrink}</h3>
            </article>
        </a>`;
    }).join(""); // seperate elements by newline character

    //return drinksHTML;
    const sectionCenter = getElement(".section-center");
    sectionCenter.innerHTML = drinksHTML;
    hideLoading();

    return sectionCenter;
}

export default displayDrinks;
