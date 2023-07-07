import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");
const galleryMarkup = createGallaryMarkup(galleryItems);
let instance;
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

function createGallaryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join("");
}

function closeModal(event) {
  if (event.code === "Escape") {
    document.removeEventListener("keyup", closeModal);
    instance.close();
  }
}

function openOriginalSize(event) {
  document.addEventListener("keyup", closeModal);
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  instance = basicLightbox.create(
    `
		<img width="1400" height="900" src="${event.target.dataset.source}">
	`
  );
  instance.show();
}

galleryList.addEventListener("click", openOriginalSize);
