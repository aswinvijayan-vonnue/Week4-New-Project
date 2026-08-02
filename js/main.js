import { register, navigate } from './router.js';
import { renderHome, renderDetails, renderList, renderSettings } from './pages.js';
import { cardComponent } from './components.js';
import { store } from './store.js';
import { addMovie } from './movieServices.js';
console.log('main.js executed');
export default function initRegister() {
  register('/', renderHome);
  register('/details', renderDetails);
  register('/movieList', renderList);
  register('/settings', renderSettings);
}
initRegister();
// register('/index.html', renderHome);

window.addEventListener('DOMContentLoaded', () => {
  console.log('called dom content loaded');
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
anchorTags.forEach((tag) => {
  tag.addEventListener('click', (e) => {
    e.preventDefault();
    const targetPath = tag.getAttribute('href');
    const url = new URL(targetPath, window.location.origin);
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
  navigate(current);
});

const movieContainer = document.querySelector('.appContainer');
const movieCards = document.querySelectorAll('.card');
console.log('testing movie container value', movieContainer?.className);
// console.log('in testing movie container is ', movieContainer.className);

movieContainer?.addEventListener('click', (e) => {
  console.log('Testing movie container clicked,...............');
  const addButton = movieContainer.querySelector('.add-but');
  const changeUserNameButton = movieContainer.querySelector('.changeUserName-button');
  const removeMovieButton = movieContainer.querySelector('.remove-movie-button');
  console.log('got remove movie button', removeMovieButton);
  const overlay = movieContainer.querySelector('.overlay');
  console.log('overlay is here', overlay?.className);

  if (e.target.closest('.overlay') !== null) {
    if (e.target.closest('.close-but')) {
      console.log('close button clicked');
      const form = document.querySelector('.overlay');
      form.classList.remove('active');
      return;
    }
  }
  if (e.target.closest('button')) {
    if (e.target.closest('button') === addButton) {
      console.log('clicked by tester');
      const form = document.querySelector('.overlay');
      if (!form) return;
      form.classList.add('active');
      return;
    } else if (e.target.closest('button') === changeUserNameButton) {
      const settingsDiv = e.target.closest('.user-info-container');
      const changeForm = settingsDiv.querySelector('.changeUserNameForm');
      changeForm.classList.add('showForm');
    } else if (e.target.closest('button') === removeMovieButton) {
      console.log('inside remove movie button in test');
      const current = store.getState();
      store.dispatch({
        type: 'DELETE_MOVIE',
        payload: current.route.params.id,
      });
      const toPath = '/movieList';
      history.pushState({}, '', toPath);
      store.dispatch({
        type: 'ROUTE_CHANGED',
        payload: {
          path: toPath,
          params: {},
        },
      });

      navigate(toPath);
    }
  }
  if (e.target.closest('.movie') !== null) {
    const card = e.target.closest('.movie');
    const movieId = card.id;
    // const allMovies = store.getState().movies;
    // const clickedMovie = allMovies.find((movie) => movie.id == card.id);

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
    console.log('Form submitted');
    addMovie();
  } else if (e.target.closest('.changeUserNameForm')) {
    const form = e.target.closest('.changeUserNameForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log('testingg data', data);
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

document.addEventListener('keydown', (e) => {
  const form = document.querySelector('.overlay');
  if (e.key === 'Enter' && form.classList.contains('active')) addMovie();
  if (e.key === 'Escape' && form.classList.contains('active')) form.classList.remove('active');
});
