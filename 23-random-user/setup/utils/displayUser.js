import get from "./getElement.js";
import removeActive from './removeActive.js';

const img = get('.user-img');
const title = get(".user-title");
const value = get(".user-value");
const buttons = [...document.querySelectorAll(".icon")];
function displayUser(user) {
    img.src = user.image;
    value.textContent = user.name;
    title.content = `My name is`;
    removeActive(buttons);
    buttons.forEach((btn) => {
        const label = btn.dataset.label;
        btn.addEventListener("click", () => {
            title.textContent = `my ${label} is`;
            value.textContent = user[label];
            removeActive(buttons);
            btn.classList.add("active");
        });
    });
}

export default displayUser;