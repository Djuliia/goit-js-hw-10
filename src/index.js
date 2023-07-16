import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

let select;

fetchBreeds()
  .then(breeds => {
    breedSelect.classList.remove('non-active');
    loader.classList.add('non-active');
    createOptionsMarkup(breeds);
    select = new SlimSelect({
      select: breedSelect,
      settings: {
        showSearch: false
      }
    });
  })
  .catch(error => {
    Notiflix.Notify.failure('Oops! Something went wrong!');
    loader.classList.add('non-active');
  }
);

  function createOptionsMarkup(breeds) {
    const optionsMarkup = breeds.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
    breedSelect.innerHTML = optionsMarkup;
  }

breedSelect.addEventListener('change', () => {
  catInfo.innerHTML = '';
  loader.classList.remove('non-active');
  const breedId = breedSelect.value;
  fetchCatByBreed(breedId)
    .then(response => {
      loader.classList.add('non-active');
      const { url, breeds } = response.data[0];
      const { name, description, temperament } = breeds[0];
      createCatMarkupById({ url, name, description, temperament });
    })
    .catch((error) => {
      Notiflix.Notify.failure('Oops! Something went wrong!');
      loader.classList.add('non-active');
    });
});

function createCatMarkupById({ url, name, description, temperament }) {
  const markup =   
    `<img src="${url}" alt="${name}" width="400">
    <div class="text-wrapper">
      <h2 class="title">${name}</h2>
      <p>${description}</p>
      <p><span class="temperament-style">Temperament: </span>${temperament}</p>
    </div>`;
  catInfo.insertAdjacentHTML('beforeend', markup); 
}