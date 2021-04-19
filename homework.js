import pictureFile from './gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const backdropEl = document.querySelector('.lightbox__overlay')
const openModalBigImg = document.querySelector('.lightbox__image');
const btnEl = document.querySelector('button[data-action="close-lightbox"]');

const cardsImages = createGalleryLayout(pictureFile);

galleryListEl.insertAdjacentHTML('beforeend', cardsImages);

function createGalleryLayout(images) {
return images.map(({ preview, original, description }) => {
return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
  </a>
</li>`
}).join('')
}

galleryListEl.addEventListener('click', onOpenPictureByClick );

function onOpenPictureByClick(e) {
e.preventDefault();

if (!e.target.classList.contains('gallery__image')) {
return;
}

modalEl.classList.add('is-open');

openModalBigImg.src = e.target.getAttribute('data-source');
}

function onClosePictureByClick() {

    openModalBigImg.removeAttribute('src');

    modalEl.classList.remove('is-open');
}