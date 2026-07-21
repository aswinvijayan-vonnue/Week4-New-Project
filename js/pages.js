import { buttonComponent, cardComponent, modalComponent } from './components.js';
import { store } from './store.js';

let appContainer = document.querySelector('.appContainer');
export function renderHome() {
  appContainer.innerHTML = '';
  const home = document.querySelector('#home');
  const clonedHome = home.cloneNode(true);
  console.log(home);
  appContainer.append(clonedHome);
}
export function renderList() {
  appContainer.innerHTML = '';
  const but = buttonComponent();
  but.className = 'add-but';
  but.textContent = 'Add Movie';
  console.log('button', but);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'overlay';
  const formEle = modalComponent();
  const form = formEle.querySelector('form');
  form.setAttribute('id', 'movieForm');
  overlayDiv.append(formEle);

  const { movies } = store.getState();
  console.log('movies:', movies);

  const movieList = document.querySelector('#list');
  const clonedMovieList = movieList.cloneNode(true);
  console.log(clonedMovieList);
  appContainer.append(but, overlayDiv, clonedMovieList);
}

export function renderDetails(id = 'abc') {
  const info = store.getState();
  const movieInfo = info.movies;
  const selectedMovie = movieInfo.find((movie) => movie.id === id);
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
  console.log(clonedOriginalDetails);
  appContainer.append(clonedOriginalDetails);
}

export function renderSettings() {
  appContainer.innerHTML = '';
  const settings = document.querySelector('#settings');
  const clonedSettingsPage = settings.cloneNode(true);
  const curState = store.getState();
  console.log(curState);
  if (curState.username) {
    const userNamePtag = clonedSettingsPage.querySelector('.userName');
    userNamePtag.textContent = curState.username;
  }

  appContainer.appendChild(clonedSettingsPage);
}
