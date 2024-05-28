const closeBtn = document.querySelector(".close-btn");
const sidebarToggle = document.querySelector(".sidebar-toggle");
const bar = document.querySelector(".sidebar");

sidebarToggle.addEventListener("click", function () {
    bar.classList.toggle("show-sidebar");
});

closeBtn.addEventListener("click", function () {
    bar.classList.remove("show-sidebar");
});