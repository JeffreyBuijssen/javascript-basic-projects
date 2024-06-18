const container = document.querySelector('.container');


export const display = (followers) => {
    const newFollowers = followers.map((person) => {
        const { img, name, profile } = person;
        return `
        <article class ='card'>
          <img src="${img}" alt="person" />
            <h4>${name}</h4>
          <a href="${profile}" class="btn">view profile</a>
        </article>`
    }).join('');
    container.innerHTML = newFollowers;
}
export default display;
