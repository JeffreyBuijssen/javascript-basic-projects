// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit options
let editElement;
let editFlag = false;
let editID = "";


// ****** EVENT LISTENERS **********
// submit form
form.addEventListener("submit", addItem);

// clear items
clearBtn.addEventListener("click", clearItems);

window.addEventListener("DOMContentLoaded", setupItems);

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    const groceryValue = grocery.value;
    const id = new Date().getTime().toString(); // Don't do this in serious projects
    if (groceryValue && !editFlag) {
        createListItem(id, groceryValue);
        displayAlert("item addded to list", "success");
        // show container
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id, groceryValue);
        setBackToDefault();
    } else if (groceryValue && editFlag) {
        editElement.innerHTML = groceryValue;
        displayAlert("value changed", "success");
        // edit local storage();
        editLocalStorage(editID, groceryValue);
        setBackToDefault();
    } else {
        displayAlert("please enter value", "danger");
    }
}

// display Alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    // remove alert
    setTimeout(function () {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// clear Items
function clearItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });
        container.classList.remove("show-container");
        displayAlert("empty list", "danger");
        setBackToDefault();
        localStorage.removeItem("list");
    }
}

// delete fuctnion
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.length < 1) {
        list.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");
    // remove from local storage
    removeFromLocalStorage(id);
    setBackToDefault();
}
// edit fuctnion
function editItem(e) {
    // find arcticle that is parent of this button
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Edit";
}

// set back to default
function setBackToDefault() {
    console.log("set back to default");
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// add to local storage

// ****** LOCAL STORAGE **********

// localStorage api
// setItem, getItem, removeItem, save as strings

function addToLocalStorage(id, value) {
    const grocery = { id, value };
    console.log(grocery);
    let items = getFromLocalStorage();
    console.log(items);
    items.push(grocery);
    setInLocalStorage(items);
}

function getFromLocalStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}

function setInLocalStorage(list) {
    localStorage.setItem("list", JSON.stringify(list));
}

function editLocalStorage(id, value) {
    let items = getFromLocalStorage();
    items = items.map(function (item) {
        if (item.id === id) item.value = value;
        return item;
    });
    setInLocalStorage(items);
}

function removeFromLocalStorage(id) {
    let items = getFromLocalStorage();
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });
    if (items.length < 1) localStorage.removeItem("list");
    else setInLocalStorage(items);
}

// ****** SETUP ITEMS **********

function setupItems() {
    let items = getFromLocalStorage();
    if (items.length > 0) {
        items.forEach(function (item) {
            createListItem(item.id, item.value);
        });
        container.classList.add("show-container");
    }
}

function createListItem(id, value) {
    const element = document.createElement("article");
    // add class
    element.classList.add("grocery-item");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML =
        `<p class="title">${value}</p>
                <div class="btn-container">
                <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
}