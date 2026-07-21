import { register, navigate } from './router.js';
import { renderHome, renderDetails, renderList, renderSettings } from './pages.js';
register('/', renderHome);
register('/details', renderDetails);
register('/movieList', renderList);
register('/settings', renderSettings);
// register('/index.html', renderHome);

window.addEventListener('DOMContentLoaded', () => {
  console.log('here');
  const url = new URL(window.location.href);
  console.log(url.pathname);
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
    history.pushState({}, '', url);
    navigate(url.pathname);
  });
});

window.addEventListener('popstate', () => {
  const current = window.location.pathname;
  console.log(current);
  navigate(current);
});

const movieContainer = document.querySelector('.movie-container');
const movieCards = document.querySelectorAll('.card');
movieContainer.addEventListener('click', (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  const movieId = card.id;
  console.log(movieId);

  const newPath = `/details/:${movieId}`;
  history.pushState({}, '', newPath);

  navigate(newPath);
});
