import { register, navigate } from './router.js';
import { renderHome, renderDetails, renderList, renderSettings } from './pages.js';
import { cardComponent } from './components.js';
import { store } from './store.js';
register('/', renderHome);
register('/details', renderDetails);
register('/movieList', renderList);
register('/settings', renderSettings);
// register('/index.html', renderHome);

window.addEventListener('DOMContentLoaded', () => {
  console.log('here');
  const url = new URL(window.location.href);
  console.log(url.pathname);
  store.dispatch({
    type: 'ROUTE_CHANGED',
    payload: {
      path: url.pathname,
      params: {},
    },
  });
  // history.pushState({}, '', url);
  navigate(url.pathname);
});

const anchorTags = document.querySelectorAll('.url-link');
console.log(anchorTags);
anchorTags.forEach((tag) => {
  tag.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPath = tag.getAttribute('href');
    const url = new URL(targetPath, window.location.origin);
    console.log(url.pathname);
    store.dispatch({
      type: 'ROUTE_CHANGED',
      payload: {
        path: url.pathname,
        params: {},
      },
    });
    history.pushState({}, '', url);
    navigate(url.pathname);
  });
});

window.addEventListener('popstate', () => {
  const current = window.location.pathname;
  console.log(current);
  navigate(current);
});

const movieContainer = document.querySelector('.appContainer');
const movieCards = document.querySelectorAll('.card');

movieContainer.addEventListener('click', (e) => {
  const addButton = movieContainer.querySelector('.add-but');
  const changeUserNameButton = movieContainer.querySelector('.changeUserName-button');

  if (e.target.closest('.overlay') !== null) {
    if (e.target.closest('.close-but')) {
      const form = document.querySelector('.overlay');
      form.classList.remove('active');
      return;
    }
  }
  if (e.target.closest('button') === addButton) {
    const form = document.querySelector('.overlay');
    if (!form) return;
    form.classList.add('active');
    return;
  }
  if (e.target.closest('button') === changeUserNameButton) {
    console.log('clicked', changeUserNameButton);
    const settingsDiv = e.target.closest('.user-info-container');
    const changeForm = settingsDiv.querySelector('.changeUserNameForm');
    console.log(changeForm);
    changeForm.classList.add('showForm');
  }
  if (e.target.closest('.movie') !== null) {
    const card = e.target.closest('.movie');
    const movieId = card.id;
    const allMovies = store.getState().movies;
    console.log('clicked card', allMovies);

    const newPath = `/details/:${movieId}`;
    history.pushState({}, '', newPath);
    store.dispatch({
      type: 'ROUTE_CHANGED',
      payload: {
        path: newPath,
        params: { id: movieId },
      },
    });

    navigate(newPath);
  }
});

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.closest('#movieForm')) {
    const form = document.querySelector('#movieForm');
    const formData = new FormData(form);
    const objData = Object.fromEntries(formData.entries());
    console.log(objData);
    form.reset();
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('active');
    renderCard(objData);
  }
  if (e.target.closest('.changeUserNameForm')) {
    const form = e.target.closest('.changeUserNameForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    if (data.username.trim() !== '') {
      const parentDiv = e.target.closest('.user-info-container');
      const usernameDiv = parentDiv.querySelector('.userName');
      usernameDiv.textContent = data.username;
      store.dispatch({
        type: 'USER_CHANGED',
        payload: data.username,
      });
    }
    form.classList.remove('showForm');
    form.reset();
  }
});

function renderCard(data) {
  const card = cardComponent();
  card.id = `card${Date.now()}`;
  let imgSrc =
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411';

  store.dispatch({
    type: 'CREATE_MOVIE',
    payload: { id: card.id, ...data, imgSrc: imgSrc },
  });

  const movieName = card.querySelector('.movieName');
  const movieYear = card.querySelector('.movieYear');
  movieName.textContent = data.movie;
  movieYear.textContent = data.year;
  console.log(card);
  const container = movieContainer.querySelector('.movies-container');

  container.appendChild(card);
  console.log(container);
}
