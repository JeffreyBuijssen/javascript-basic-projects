function removeActive(elements) {
    elements.forEach((element) => {
        element.classList.remove("active");
    });
}

export default removeActive;