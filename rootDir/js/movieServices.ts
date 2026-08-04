import { renderList } from './pages';
import { cardComponent } from './components';
import { store } from './store';

type FormDataType = {
  movie: string;
  director: string;
  year: string;
  description: string;
};

export function addMovie() {
  const form = document.querySelector<HTMLFormElement>('#movieForm');
  if (!form) throw new Error('Form is not defined');
  const formData = new FormData(form);
  const objData = Object.fromEntries(formData.entries()) as FormDataType;
  form.reset();
  const overlay = document.querySelector('.overlay');
  if (!overlay) throw new Error('Overlay doesnot found');
  overlay.classList.remove('active');
  renderCard(objData);
}

function renderCard(data: FormDataType) {
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
