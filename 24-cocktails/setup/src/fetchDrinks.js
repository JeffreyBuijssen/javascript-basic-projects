import { showLoading } from "./toggleLoading.js";

const fetchDrinks = async (URL) => {
    showLoading();
    try {
        const response = await fetch(URL, {
            hearders: {
                "Content-Type": "application/json",
                "User-Agent": "Learning App",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    };
}

export default fetchDrinks;