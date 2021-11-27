import { Notify } from 'notiflix';
import './sass/main.scss';
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;

const searchForm = document.querySelector("#search-form")
const gallery = document.querySelector('.gallery')
const loadMore = document.querySelector('.load-more')

const submitSearchForm = searchForm.addEventListener('submit', searchSubmit)
const clickloadMore = loadMore.addEventListener('click', addPages)

let page = 1

async function getPicture(value) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=24537625-47620fa03ad46ed0668a7b060&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`)
    console.log(response);
      return await response
  } catch (error) {
    console.error(error);
  }
}

function addPages(e) {
      page += 1
const {
    elements: { searchQuery }
  } = searchForm;
  console.log(searchQuery.value)
  const query = searchQuery.value.trim()
  const fech = getPicture(query)
  const info = fech.then(array => {
   array
        markupCards(array)
  const limit = 40
  const totalPages = array.data.totalHits / limit
  if (page > totalPages) {
    Notify.warning("We're sorry, but you've reached the end of search results.");
    loadMore.classList.remove("is-open")
  }
  })
  // gallery.refresh(); (Выбивает ошибку)
}

function searchSubmit(e) {
  e.preventDefault()
    page = 1
  loadMore.classList.remove("is-open")
  gallery.innerHTML = ""
  const {
    elements: { searchQuery }
  } = e.currentTarget;
  const query = searchQuery.value.trim()
  const fech = getPicture(query)
  const info = fech.then(array => {
   array
    return markupAndNotification(array)
  })

}
 

function markupCards(array) {
  const markup = array.data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {return `<a href="${webformatURL}" class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300px" heigth="300" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</a>`}).join('');
  gallery.insertAdjacentHTML('beforeend', markup)
  var lightbox = new SimpleLightbox('.gallery a', { captions: true, captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250, });
  gallery.addEventListener('click', lightbox)
}

function markupAndNotification(array) {
      if (array.data.hits.length < 1) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      else {
        markupCards(array)
        loadMore.classList.toggle("is-open")
        Notify.success(`Hooray! We found ${array.data.totalHits} images.`)
      }
  const limit = 40
  const totalPages = array.data.totalHits / limit
  if (page > totalPages && array.data.hits.length > 1) {
    Notify.warning("We're sorry, but you've reached the end of search results.");
    loadMore.classList.remove("is-open")
      }
}