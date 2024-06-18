import subLinks from './data.js';

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");

const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebarLinks = document.querySelector(".sidebar-links");

const linkBtns = [...document.querySelectorAll('.link-btn')];
const submenu = document.querySelector('.submenu');

const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');
const navLinksContainer = document.querySelector(".nav-links");

// Implement showing and hiding of sidebarWrapper when clicking toggleBtn
toggleBtn.addEventListener('click', () => {
    sidebarWrapper.classList.toggle('show');
});
// hide sidebarWrapper when clicking close btn.
closeBtn.addEventListener('click', () => {
    sidebarWrapper.classList.remove('show');
});

// set sidebar
window.addEventListener("DOMContentLoaded", (e) => {
    const articles = subLinks.map((sub) => {
        const links = sub.links.map((link) => {
            const { label, icon, url } = link;
            return `<a href="${url}"><i class="${icon}"></i>${label}</a>`;
        }).join("");
        return `
        <article>
          <h4>${sub.page}</h4>
          <div class="sidebar-sublinks">
            ${links}
          </div>
        </article>`
    }).join("");
    sidebarLinks.innerHTML = articles;
});




linkBtns.forEach((btn) => {
    btn.addEventListener('mouseover', function (e) {
        const text = e.currentTarget.textContent;

        // Get bounds of hovered button
        const tempBtn = e.currentTarget.getBoundingClientRect();
        const center = (tempBtn.left + tempBtn.right) / 2;
        const bottom = tempBtn.bottom - 3;

        const tempPage = subLinks.find((link) => link.page === text);
        if (tempPage) {
            const { page, links } = tempPage;
            submenu.classList.add('show');
            submenu.style.left = `${center}px`;
            submenu.style.top = `${bottom}px`;

            // OPTIONAL
            let columns = 'col-2';
            if (links.length === 3) columns = 'col-3';
            if (links.length === 4) columns = 'col-4';

            submenu.innerHTML =
                `
            <section>
                <h4>${page}</h4>
                <div class="submenu-center ${columns}">
                ${links.map((link) => {
                    return `<a href="${link.url}"><i class="${link.icon}"></i>${link.label}</a>`;
                }).join('')
                }
                </div >
            </section>
            `;
        }
    });
});
hero.addEventListener("mouseover", function (e) {
    submenu.classList.remove('show');
});

nav.addEventListener('mouseover', function (e) {
    if(!e.target.classList.contains('link-btn')) {
        submenu.classList.remove('show');
    }
});
