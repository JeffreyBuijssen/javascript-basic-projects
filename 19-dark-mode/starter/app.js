const toggleBtn = document.querySelector(".toggle-btn");
const articlesContainer = document.querySelector(".articles");


toggleBtn.addEventListener("click", function () {
    const darkMode = document.documentElement.classList.toggle('dark-theme');

    const nightIcon = `toggle <i class="fas fa-moon"></i>`;
    const dayIcon = `toggle <i class="fas fa-sun"></i>`;

    if (darkMode) {
        toggleBtn.innerHTML = dayIcon;
    } else {
        toggleBtn.innerHTML = nightIcon;
    }

});

/*articleContainer.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded");
});*/

const articlesData = articles.map((article) => {
    const { title, length, date, snippet } = article;
    const formatedDate = moment(date).format("MMMM Do, YYYY");
    return `<article class="post">
            <h2>${title}</h2>
            <div class="post-info">
              <span>${formatedDate}</span>
              <span>${length} min read</span>
            </div>
            <p>${snippet}
            </p>
          </article>`;
}).join("");
articlesContainer.innerHTML = articlesData;