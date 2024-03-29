import pictureFile from './gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const backdropEl = document.querySelector('.lightbox__overlay')
const openModalBigImg = document.querySelector('.lightbox__image');
const btnEl = document.querySelector('button[data-action="close-lightbox"]');

function createGalleryLayout(images) {
return images.map(({ preview, original, description }) => {
return `<li class="gallery__item">
  <a class="gallery__link"
  href="${original}">
    <img class="gallery__image"
    src="${preview}" 
    data-source="${original}" 
    alt="${description}" />
  </a>
</li>`
}).join('')
}

const cardsImages = createGalleryLayout(pictureFile);

galleryListEl.insertAdjacentHTML('beforeend', cardsImages);

galleryListEl.addEventListener('click', onOpenPictureByClick );

//Открытие модального окна с большим изображением//
function onOpenPictureByClick(e) {
    e.preventDefault();

   if (!e.target.classList.contains('gallery__image')) {
   return;
    }

    modalEl.classList.add('is-open');

    openModalBigImg.src = e.target.getAttribute('data-source');
     
    btnEl.addEventListener('click', onClosePictureByClick);

    backdropEl.addEventListener('click', onClosePictureByClick);

    window.addEventListener('keydown', onClosePictureEsc);

    
}

//Закрытие модального окна с большим изображением//
function onClosePictureByClick() {

    openModalBigImg.removeAttribute('src');

    modalEl.classList.remove('is-open');

    btnEl.removeEventListener('click', onClosePictureByClick);

    backdropEl.removeEventListener('click', onClosePictureByClick);

    window.removeEventListener('keydown', onClosePictureEsc);
}

//Закрытие модального окна с помощью  клавиши Esc //
function onClosePictureEsc(e) {
    if (e.code === 'Escape') {
        onClosePictureByClick(e);
        window.removeEventListener('keydown', onClosePictureEsc);
    };
}
