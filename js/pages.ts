import { buttonComponent, cardComponent, modalComponent } from './components';
import { store } from './store';
import type { RenderArg, ReturnArg } from './router';

export function renderHome() {
  let appContainer = document.querySelector('.appContainer');
  if (!appContainer) return;
  appContainer.innerHTML = '';
  const home = document.querySelector('#home');
  if (!home) return;
  const clonedHome = home.cloneNode(true);
  appContainer.append(clonedHome);
}
export function renderList() {
  let appContainer = document.querySelector('.appContainer');
  if (!appContainer) return;
  appContainer.innerHTML = '';
  const but = buttonComponent();
  but.className = 'add-but';
  but.textContent = 'Add Movie';

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'overlay';
  const formEle = modalComponent();
  const form = formEle.querySelector('form');
  form?.setAttribute('id', 'movieForm');
  overlayDiv.append(formEle);

  const movieList = document.querySelector('#list');
  if (!movieList) throw new Error('Movie list section doesnot exists');
  const clonedMovieList = movieList.cloneNode(true) as HTMLElement;

  const movieContainer = clonedMovieList.querySelector('.movies-container');
  const { movies } = store.getState();
  console.log('hiiii', movies);
  const emptyMovie = movieContainer?.querySelector('.emptyMovie');

  const oldCards = movieContainer?.querySelectorAll('.movie');
  oldCards?.forEach((card) => card.remove());
  console.log('movies.length', movies?.length);
  if (movies && movies.length > 0) {
    console.log('entered testttt', movies);
    console.log('emptyyy', emptyMovie?.className);
    if (emptyMovie) emptyMovie.classList.add('hidden');
    console.log('emptyyy2', emptyMovie?.className);
    const card = cardComponent();

    movies.forEach((movie) => {
      const clonedCard = card.cloneNode(true) as HTMLElement;
      clonedCard.setAttribute('id', movie.id);
      const clonedName = clonedCard.querySelector('.movieName');
      const clonedYear = clonedCard.querySelector('.movieYear');
      if (clonedName && clonedYear) {
        clonedName.textContent = movie.movie;
        clonedYear.textContent = movie.year;
        movieContainer?.append(clonedCard);
      }
    });
  } else {
    if (emptyMovie) emptyMovie.classList.remove('hidden');
  }

  appContainer.append(but, overlayDiv, clonedMovieList);
}

export function renderDetails(id: RenderArg = 'abc'): ReturnArg {
  let appContainer = document.querySelector('.appContainer');
  if (!appContainer) return;
  const info = store.getState();
  const movieInfo = info.movies;
  const selectedMovie = movieInfo?.find((movie) => movie.id === id);
  if (!selectedMovie) return false;
  console.log('in render details', selectedMovie);
  appContainer.innerHTML = '';
  const originalDetails = document.querySelector('#details');
  const clonedOriginalDetails = originalDetails?.cloneNode(true) as HTMLElement;

  const movie = clonedOriginalDetails.querySelector('.single-movie');
  if (!movie) return;
  const movieTitle = movie?.querySelector('.movieName');
  if (!movieTitle) return;
  movieTitle.textContent = selectedMovie.movie;

  const movieYear = movie?.querySelector('.single-movie-year');
  if (!movieYear) return;
  movieYear.textContent = selectedMovie.year;

  const poster = movie?.querySelector('.moviePoster');
  poster?.setAttribute('src', selectedMovie.imgSrc);
  const descriptionDiv = movie.querySelector('.movieDesc');
  const directorDiv = movie.querySelector('.directorName');
  if (descriptionDiv && directorDiv) {
    descriptionDiv.textContent = selectedMovie.description;
    directorDiv.textContent = selectedMovie.director;
  }

  clonedOriginalDetails.append(movie);
  appContainer.append(clonedOriginalDetails);
  return true;
}

export function renderSettings() {
  let appContainer = document.querySelector('.appContainer');
  if (!appContainer) return;
  appContainer.innerHTML = '';
  const settings = document.querySelector('#settings');
  const clonedSettingsPage = settings?.cloneNode(true) as HTMLElement;
  const curState = store.getState();
  if (curState.username) {
    const userNamePtag = clonedSettingsPage.querySelector('.userName');
    if (!userNamePtag) return;
    userNamePtag.textContent = curState.username;
  }

  appContainer.appendChild(clonedSettingsPage);
}
