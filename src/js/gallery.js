import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import alertImg from "/img/alert.svg";
import axios from "axios";

const form = document.querySelector('.form');
const getMoreBtn = document.querySelector(".get-more-btn");

const selectors = {
    searchBtn: ".search-btn",
    searchTerm: ".searchTerm",
    loader: ".loader",
    gallery: ".gallery",
    galLink: ".gallery-link",
};

const photoLoader = {
    url: "https://pixabay.com/api/",
    searchParams: {
        key: "40878457-91c7c8077e8a58c5727309d44",
        q: "",
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: 1,
    },
    searchPhotosBtn: document.querySelector(selectors.searchBtn),
    searchTerm: document.querySelector(selectors.searchTerm),
    loader: document.querySelector(selectors.loader),
    gallery: document.querySelector(selectors.gallery),

    simpleGallery: new SimpleLightbox(selectors.gallery + ' a', {
        overlayOpacity: 0.8,
        captionsData: 'alt',
        captionDelay: 250,
    }),

    startSearch(event) {
        event.preventDefault();
        if (this.searchTerm.value.trim().length < 3) {
            this.showAlert("Please, enter search term!");
            return;
        }
        this.gallery.innerHTML = '';
        this.searchParams.q = this.searchTerm.value.trim();
        this.searchParams.page = 1;
        this.fetchPhotos();
    },

    continueSearch() {
        this.searchParams.page += 1;
        this.fetchPhotos();
    },

    renderPhotos(photos) {
        if (photos.total === 0) {
            this.showAlert('Sorry, there are no images matching your search query. Please try again!');
            this.showLoader(false);
            return;
        }
        const markup = photos.hits
            .map((photo) => {
                return `<a class="gallery-link" href="${photo.largeImageURL}"><span class="gallery-item"><img class="gallery-image" src="${photo.webformatURL}" alt="${photo.tags}" title="${photo.tags}" /></span>
                <span class="img-stat">
                <span class="img-stat-item"><span class="img-stat-title">Likes</span><span class="img-stat-val">${photo.likes}</span></span>
                <span class="img-stat-item"><span class="img-stat-title">Views</span><span class="img-stat-val">${photo.views}</span></span>
                <span class="img-stat-item"><span class="img-stat-title">Comments</span><span class="img-stat-val">${photo.comments}</span></span>
                <span class="img-stat-item"><span class="img-stat-title">Downloads</span><span class="img-stat-val">${photo.downloads}</span></span>
                </span>
                </a>`;
            })
            .join("");
        this.gallery.insertAdjacentHTML("beforeend", markup);

        if (this.searchParams.page === 1 && photos.totalHits > 1) {
            getMoreBtn.style.display = 'block';
        }        
        if (Math.ceil(photos.totalHits / this.searchParams.per_page) === this.searchParams.page) {
            getMoreBtn.style.display = 'none';
            this.showAlert("We're sorry, but you've reached the end of search results.");
        }
        this.simpleGallery.refresh();
        this.scrollTop();
    },

    scrollTop() {
        if (this.searchParams.page > 1) {
            const rect = document.querySelector(selectors.galLink).getBoundingClientRect();
            window.scrollBy({ top: rect.height * 2, left: 0, behavior: "smooth" });
        }
    },

    showLoader(state = true) {
        this.loader.style.display = !state ? 'none' : 'inline-block';
        this.searchPhotosBtn.disabled = state;
    },

    showAlert(msg) {
        iziToast.show({
            position: 'center',
            iconUrl: alertImg,
            messageColor: '#FAFAFB',
            messageSize: '16px',
            backgroundColor: '#EF4040',
            close: false,
            closeOnClick: true,
            message: msg
        })
    },

    async fetchPhotos() {
        this.showLoader(true);
        try {
            const response = await axios.get(this.url, { params: this.searchParams });
            this.renderPhotos(await response.data);
        } catch (error) {
            this.showAlert(error.message);
        }
        this.showLoader(false);
    }

}

form.addEventListener("submit", (event) => photoLoader.startSearch(event));

getMoreBtn.addEventListener("click", () => photoLoader.continueSearch());


/*
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import alertImg from "/img/alert.svg";
import axios from "axios";

const url = "https://pixabay.com/api/";
const searchParams = {
    key: "40878457-91c7c8077e8a58c5727309d44",
    q: "",
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
};

const form = document.querySelector('.form');
const searchTerm = document.querySelector('.searchTerm');
const searchPhotosBtn = document.querySelector(".search-btn");
const getMoreBtn = document.querySelector(".get-more-btn");
const loader = document.querySelector('.loader');
const gallery = document.querySelector(".gallery");

const simpleGallery = new SimpleLightbox('.gallery a', {
    overlayOpacity: 0.8,
    captionsData: 'alt',
    captionDelay: 250,
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (searchTerm.value.trim().length < 3) {
        showAlert("Please, enter search term!");
        return;
    }
    gallery.innerHTML = '';
    showLoader(true);
    searchParams.q = searchTerm.value.trim();
    searchParams.page = 1;
    fetchPhotos();
});

getMoreBtn.addEventListener("click", () => {
    searchParams.page += 1;
    showLoader(true);
    fetchPhotos();
})

async function fetchPhotos() {
  try {
    const response = await axios.get(url, { params: searchParams });
      renderPhotos(await response.data);
  } catch (error) {
      showAlert(error.message);
      showLoader(false);
  }
}

function renderPhotos(photos) {
    if (photos.total === 0) {
        showAlert('Sorry, there are no images matching your search query. Please try again!');
        showLoader(false);
        return;
    }
    const markup = photos.hits
        .map((photo) => {
            return `<a class="gallery-link" href="${photo.largeImageURL}"><span class="gallery-item"><img class="gallery-image" src="${photo.webformatURL}" alt="${photo.tags}" title="${photo.tags}" /></span>
            <span class="img-stat">
            <span class="img-stat-item"><span class="img-stat-title">Likes</span><span class="img-stat-val">${photo.likes}</span></span>
            <span class="img-stat-item"><span class="img-stat-title">Views</span><span class="img-stat-val">${photo.views}</span></span>
            <span class="img-stat-item"><span class="img-stat-title">Comments</span><span class="img-stat-val">${photo.comments}</span></span>
            <span class="img-stat-item"><span class="img-stat-title">Downloads</span><span class="img-stat-val">${photo.downloads}</span></span>
            </span>
            </a>`;
        })
        .join("");
    showLoader(false);
    gallery.insertAdjacentHTML("beforeend", markup);

    if (searchParams.page === 1 && photos.totalHits > 1) {
        getMoreBtn.style.display = 'block';
    }        
    if (Math.ceil(photos.totalHits / searchParams.per_page) === searchParams.page) {
        getMoreBtn.style.display = 'none';
        showAlert("We're sorry, but you've reached the end of search results.");
    }
    simpleGallery.refresh();
    if (searchParams.page > 1) {
        const rect = document.querySelector(".gallery-link").getBoundingClientRect();
        window.scrollBy({ top: rect.height * 2, left: 0, behavior: "smooth" });
    }
}

function showLoader(state = true) {
    loader.style.display = !state ? 'none' : 'inline-block';
    searchPhotosBtn.disabled = state;
}

function showAlert(msg) {
    iziToast.show({
        position: 'center',
        iconUrl: alertImg,
        messageColor: '#FAFAFB',
        messageSize: '16px',
        backgroundColor: '#EF4040',
        close: false,
        closeOnClick: true,
        message: msg
    });
}
*/