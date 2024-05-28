import getUser from "./utils/fetchUser.js";
import get from "./utils/getElement.js";
import displayUser from "./utils/displayUser.js";

const btn = get(".btn");

// get user from api
const showUser = async () => {
    const person = await getUser();
    // display user
    displayUser(person);
}

window.addEventListener("DOMContentLoaded", showUser);
btn.addEventListener("click", showUser);