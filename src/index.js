import './sass/main.scss';
const axios = require('axios').default;

const searchForm = document.querySelector("#search-form")
const gallery = document.querySelector('.gallery')
// const searchButton = document.querySelector("#submit")

 const submitSearchForm = searchForm.addEventListener('submit',searchSubmit)
// getUser()

    async function getUser(value) {
  try {
    const response = await axios.get(`https://pixabay.com/api/?key=24537625-47620fa03ad46ed0668a7b060&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`);
    console.log(response);
    // return response
  } catch (error) {
    console.error(error);
  }
}

function searchSubmit(e) {
    e.preventDefault()
    const {
    elements: { searchQuery }
  } = e.currentTarget;
    console.log(searchQuery.value)
   const photos = getUser(searchQuery.value.trim())
  
  function markupCards(photos) {
  const photosGallery = photos.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${likes}</b>
    </p>
    <p class="info-item">
      <b>Views${vives}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`}).join('');
  return photosGallery
  }
  function createGallery() {
    gallery.insertAdjacentHTML("beforeend", markupCards(photos))
  }
  createGallery()
}

// function markupCards(photos) {
//   const photosGallery = photos.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {return `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views${vives}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads${downloads}</b>
//     </p>
//   </div>
// </div>`}).join('');
//   return photosGallery
// }