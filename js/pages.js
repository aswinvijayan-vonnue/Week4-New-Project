import { buttonComponent, cardComponent, modalComponent } from './components.js';
import { store } from './store.js';

export function renderHome() {
  let appContainer = document.querySelector('.appContainer');
  appContainer.innerHTML = '';
  const home = document.querySelector('#home');
  const clonedHome = home.cloneNode(true);
  appContainer.append(clonedHome);
}
export function renderList() {
  let appContainer = document.querySelector('.appContainer');
  appContainer.innerHTML = '';
  const but = buttonComponent();
  but.className = 'add-but';
  but.textContent = 'Add Movie';

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'overlay';
  const formEle = modalComponent();
  const form = formEle.querySelector('form');
  form.setAttribute('id', 'movieForm');
  overlayDiv.append(formEle);

  const movieList = document.querySelector('#list');
  const clonedMovieList = movieList.cloneNode(true);

  const movieContainer = clonedMovieList.querySelector('.movies-container');
  const { movies } = store.getState();
  console.log('hiiii', movies);
  const emptyMovie = movieContainer.querySelector('.emptyMovie');

  const oldCards = movieContainer.querySelectorAll('.movie');
  oldCards.forEach((card) => card.remove());
  console.log('movies.length', movies?.length);
  if (movies && movies.length > 0) {
    console.log('entered testttt', movies);
    console.log('emptyyy', emptyMovie?.className);
    if (emptyMovie) emptyMovie.classList.add('hidden');
    console.log('emptyyy2', emptyMovie?.className);
    const card = cardComponent();

    movies.forEach((movie) => {
      const clonedCard = card.cloneNode(true);
      clonedCard.setAttribute('id', movie.id);
      clonedCard.querySelector('.movieName').textContent = movie.movie;
      clonedCard.querySelector('.movieYear').textContent = movie.year;
      movieContainer.append(clonedCard);
    });
  } else {
    if (emptyMovie) emptyMovie.classList.remove('hidden');
  }

  appContainer.append(but, overlayDiv, clonedMovieList);
}

export function renderDetails(id = 'abc') {
  let appContainer = document.querySelector('.appContainer');
  const info = store.getState();
  const movieInfo = info.movies;
  const selectedMovie = movieInfo?.find((movie) => movie.id === id);
  if (!selectedMovie) return false;
  console.log('in render details', selectedMovie);
  appContainer.innerHTML = '';
  const originalDetails = document.querySelector('#details');
  const clonedOriginalDetails = originalDetails.cloneNode(true);

  const movie = clonedOriginalDetails.querySelector('.single-movie');
  const movieTitle = movie.querySelector('.movieName');
  movieTitle.textContent = selectedMovie.movie;

  const movieYear = movie.querySelector('.single-movie-year');
  movieYear.textContent = selectedMovie.year;

  const poster = movie.querySelector('.moviePoster');
  poster.setAttribute('src', selectedMovie.imgSrc);
  movie.querySelector('.movieDesc').textContent = selectedMovie.description;
  movie.querySelector('.directorName').textContent = selectedMovie.director;

  clonedOriginalDetails.append(movie);
  appContainer.append(clonedOriginalDetails);
  return true;
}

export function renderSettings() {
  let appContainer = document.querySelector('.appContainer');
  appContainer.innerHTML = '';
  const settings = document.querySelector('#settings');
  const clonedSettingsPage = settings.cloneNode(true);
  const curState = store.getState();
  if (curState.username) {
    const userNamePtag = clonedSettingsPage.querySelector('.userName');
    userNamePtag.textContent = curState.username;
  }

  appContainer.appendChild(clonedSettingsPage);
}
