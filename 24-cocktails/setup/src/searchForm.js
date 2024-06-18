import get from "./getElement.js";
import presentDrinks from "./presentDrinks.js";

const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
// select searchbar
const form = get(".search-form");
const input = get("[name='drink']");

form.addEventListener("keyup", (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (!value) presentDrinks(`${baseURL}a`);
    else presentDrinks(`${baseURL}${value}`);
});