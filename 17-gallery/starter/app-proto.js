function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element) {
    this.container = element;
    this.list = [...element.querySelectorAll(".img")];

    // target
    this.modal = getElement(".modal");
    this.modalImg = getElement(".main-img");
    this.imageName = getElement(".image-name");
    this.closeBtn = getElement(".close-btn");
    this.nextBtn = getElement(".next-btn");
    this.prevBtn = getElement(".prev-btn");
    this.modalImages = getElement(".modal-images");

    // self ref

    // not bound so it can be used by both galleries.
    //this.openModal = this.openModal.bind(this); 
    // bind fucntions
    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);

    // container Event
    this.container.addEventListener(
        "click",
        function (e) {
            // e.target is the element being clicked

            if (e.target.classList.contains("img")) {
                // only open modal when the target is an image.
                this.openModal(e.target, this.list);
            }
        }.bind(this)
    );
}

// prototype keyword seem to extend functions (prototypes) with functionality
Gallery.prototype.openModal = function (selectedImage, list) {
    // set image
    
    this.setMainImage(selectedImage);
    // set show gallery preview
    this.modalImages.innerHTML = list
        .map(function (image) {
            return `<img
                  src="${image.src}"
                  title="${image.title}" 
                  data-id="${image.dataset.id}"
                  class="${selectedImage.dataset.id === image.dataset.id ? 'modal-img selected' : 'modal-img'}">`;
    }).join(""); // parse list into string, the arguement "" makes it so the elements aren't seperated by a character (default = ",")

    // add .open to class list
    this.modal.classList.add("open");
    // add event listeners
    this.closeBtn.addEventListener("click", this.closeModal);
    this.nextBtn.addEventListener("click", this.nextImage);
    this.prevBtn.addEventListener("click", this.prevImage);
    this.modalImages.addEventListener("click", this.chooseImage);
    }

Gallery.prototype.setMainImage = function (selectedImage) {
    // set main image by setting source, for some reason replacing entire html doesn't work
    this.modalImg.src = selectedImage.src;
    this.imageName.textContent = selectedImage.title;
}

Gallery.prototype.closeModal = function () {
    this.modal.classList.remove("open");
    this.closeBtn.removeEventListener("click", this.closeModal);
    this.nextBtn.removeEventListener("click", this.nextImage);
    this.prevBtn.removeEventListener("click", this.prevImage);
    this.modalImages.removeEventListener("click", this.chooseImage);
};

Gallery.prototype.nextImage = function () {
    const selected = this.modalImages.querySelector(".selected");
    const next = selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove("selected");
    next.classList.add("selected");
    this.setMainImage(next);
};

Gallery.prototype.prevImage = function () {
    const selected = this.modalImages.querySelector(".selected");
    const prev = selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove("selected");
    prev.classList.add("selected");
    this.setMainImage(prev);
};

Gallery.prototype.chooseImage = function (e) {
    //console.log(e.target);

    const selected = this.modalImages.querySelector(".selected");
    selected.classList.remove("selected");
    e.target.classList.add("selected");
    this.setMainImage(e.target);
};

const natureGallery = new Gallery(getElement(".nature"));
const cityGallery = new Gallery(getElement(".city"));