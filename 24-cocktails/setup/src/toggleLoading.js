import getElement from "./getElement.js";
const loadingElement = getElement(".loading");

export const showLoading = () => {
    loadingElement.classList.remove("hide-loading");
}

export const hideLoading = () => {
   loadingElement.classList.add("hide-loading");
};