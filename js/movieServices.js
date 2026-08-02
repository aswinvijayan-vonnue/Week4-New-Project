import { renderList } from './pages.js';
import { cardComponent } from './components.js';
import { store } from './store.js';

export function addMovie() {
  const form = document.querySelector('#movieForm');
  const formData = new FormData(form);
  const objData = Object.fromEntries(formData.entries());
  form.reset();
  const overlay = document.querySelector('.overlay');
  overlay.classList.remove('active');
  renderCard(objData);
}

function renderCard(data) {
  const card = cardComponent();
  card.id = `card${Date.now()}`;
  let imgSrc =
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411';

  store.dispatch({
    type: 'CREATE_MOVIE',
    payload: { id: card.id, ...data, imgSrc: imgSrc },
  });
  renderList();
}
