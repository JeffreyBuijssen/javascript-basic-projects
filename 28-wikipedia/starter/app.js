// wiki docs - https://www.mediawiki.org/wiki/API:Main_page

const form = document.querySelector(".form");
const input = document.querySelector(".form-input");
const results = document.querySelector(".results");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!input.value) throw new Error("Provide a search query");

    fetchPages(cleanUserInput(input.value));

});

function cleanUserInput(userInput) {
    let cleanedInput = encodeURIComponent(userInput);
    return cleanedInput;
}

const baseUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=`;

const fetchPages = async (searchValue) => {
    const searchUrl = `${baseUrl}${searchValue}`;
    results.innerHTML = `<div class="loading"></div>`;

    try {
        const response = await fetch(searchUrl);

        if (!response.ok) throw new Error("Something went wrong while fetching your page");
        const data = await response.json();
        const { search: pages } = data.query;
        let items = pages.map((page) => {
            return {
                id: page.pageid,
                title: page.title,
                snippet: page.snippet,
            }
        });
        renderResults(items);
    } catch (error) {
        console.log(error);
    }
}

function renderResults(items) {
    results.innerHTML =
        `<div class="articles">
            ${items.map((page) => {
                return `<a href="http://en.wikipedia.org/?curid=${page.id}" target="_blank">
                  <h4>${page.title}</h4>
                  <p>${page.snippet}</p>
                  </a>`;
            }).join('')}
            </div>`;
}