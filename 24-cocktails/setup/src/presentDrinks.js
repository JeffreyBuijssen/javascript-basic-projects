import fetchDrinks from "./fetchDrinks.js";
import displayDrinks from "./displayDrinks.js";
import setDrink from "./setDrink.js"; 

// default is 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a' which returns all drinks
const showDrinks = async (url) => {
    // fetch drinks
    const data = await fetchDrinks(url);

    // display drinks
    const section = await displayDrinks(data);
    if (section) {
        setDrink(section);
    }
}

export default showDrinks;