import data from "./data.js";
import fetchUser from "./utils/fetchUser.js";
import fetchUsers from "./utils/fetchUser.js";

const container = document.querySelector(".slide-container");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

// if lenght is 1 hide buttons
if (data.length === 1) {
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
}

// if lenght is 2, add copies of slide
let people = [...data];
if (data.length === 2) {
    people = [...data, ...data];
}



const startSlider = (type) => {
    // get all three slides active, last, next
    const active = document.querySelector('.active');
    const last = document.querySelector('.last');
    let next = document.querySelector('.next');
    if (!next) next = container.firstElementChild;

    active.classList.remove('active');
    last.classList.remove('last');
    next.classList.remove('next');

    if (type === 'prev') {
        active.classList.add('next');
        last.classList.add('active');
        next = last.previousElementSibling;
        if (!next) next = container.lastElementChild;
        next.classList.remove('next');
        next.classList.add('last');
        return;
    }
    active.classList.add('last');
    next.classList.add('active');
    next = next.nextElementSibling;
    if (!next) next = container.firstElementChild;
    next.classList.remove('last');
    next.classList.add('next');
    next.nextElementSibling.add('next');
}

nextBtn.addEventListener("click", () => {
    startSlider();
});
prevBtn.addEventListener('click', () => {
    startSlider('prev');
});

function initUsers() {
    container.innerHTML = people.map((person, slideIndex) => {
        const { image, name, job, text } = person;
        let position = '';
        if (slideIndex === 0) position = 'active';
        if (slideIndex === people.length - 1) position = 'last';
        if (slideIndex === 1) position = 'next';
        if (data.length <= 1) position = 'active';
        return `
        <article class="slide ${position}">
          <img class="img" src="${image}" alt="${name}"><img/>
          <h4>${name}</h4>
          <p class="title">${job}</p>
          <p class="text">${text}</p>
          <div class="quote-icon"><i class="fas fa-quote-right"></i></div>
        </article>
        `;
    }).join("");
}

const fetchInitialUsers = async () => {
    people = await fetchUsers(10);

    initUsers();
    
}

window.addEventListener("DOMContentLoaded", fetchInitialUsers);
