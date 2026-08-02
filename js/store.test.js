import { store, onRouteChange } from './store.js';
// import { navigate } from './router.js';
import fs from 'fs';
import path from 'path';
beforeEach(() => {
  jest.resetModules();
});

describe('testing each method inside the store function', () => {
  test('testing dispatch method and get state just after route change', () => {
    expect(onRouteChange('/settings', {})).toBe('Success');
    expect(store.getState()).not.toBeNull();
    expect(store.getState().route.path).toBe('/settings');
  });
  test('Testing create movie', () => {
    const event = {
      type: 'CREATE_MOVIE',
      payload: {
        description: 'Super',
        director: 'Leo',
        id: 'card123',
        imgSrc: 'image.png',
        movie: 'Spider Man',
        year: '2026',
      },
    };
    expect(onRouteChange('/movieList', {})).toBe('Success');
    let val;
    if (store.getState().movies) val = store.getState().movies.length;
    else val = 0;
    store.dispatch(event);
    expect(store.getState().movies.length).toBeGreaterThan(val);
  });
  test('Testing user changed', () => {
    expect(onRouteChange('/settings', {})).toBe('Success');
    store.dispatch({ type: 'USER_CHANGED', payload: 'Amal' });
    expect(store.getState().username).toBe('Amal');
  });
  test('Testing delete movie functionality', () => {
    expect(onRouteChange('/movieList', {})).toBe('Success');
    let id = 'card123';
    const movie = store.getState().movies.find((mv) => mv.id === id);
    expect(movie).not.toBeNull();
    store.dispatch({ payload: id, type: 'DELETE_MOVIE' });
    let isDlted = store.getState().movies.find((mv) => mv.id === id);
    expect(isDlted).toBeFalsy();
  });
  test('listener method', () => {
    let fnc = jest.fn();
    fnc.mockImplementation((store) => console.log('Success'));
    store.subscribe(fnc);
    expect(onRouteChange('/settings', {})).toBe('Success');
    expect(fnc).toHaveBeenCalledTimes(1);
    expect(fnc).toHaveBeenCalledWith(store.getState());
  });
  test('checking default case', () => {
    let state = store.getState();
    store.dispatch({ type: 'DELETE' });
    expect(store.getState()).toEqual(state);
  });
});

describe('main.js dom content loaded', () => {
  let logspy;
  let mockNav = jest.fn();

  beforeEach(async () => {
    jest.clearAllMocks();
  });
  test('testing domContent loaded', async () => {
    await import('./main.js');
    jest.mock('./router.js', () => ({
      navigate: mockNav,
      register: jest.fn(),
    }));
    logspy = jest.spyOn(console, 'log');
    window.history.replaceState({}, '', '/movieList');
    // window.location = new URL('https://example.com');

    const event = new Event('DOMContentLoaded');
    window.dispatchEvent(event);
    expect(logspy).toHaveBeenCalledWith('called dom content loaded');
    expect(mockNav).toHaveBeenCalled();
    expect(mockNav).toHaveBeenCalledWith('/movieList');
  });
  test('testing popstate', async () => {
    await import('./main.js');
    window.history.replaceState({}, '', '/movieList');
    const event = new Event('popstate');
    window.dispatchEvent(event);
    expect(mockNav).toHaveBeenCalled();
  });
});

describe('HTML file header section testing', () => {
  beforeEach(async () => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;
    jest.resetModules();
  });
  test('anchor tag testing', async () => {
    let mockNav = jest.fn();
    jest.mock('./router.js', () => ({
      navigate: mockNav,
      register: jest.fn(),
    }));
    await import('./main.js');
    const nav = document.querySelector('nav');
    const aTags = nav.querySelectorAll('a');
    const settings = aTags[1];
    const path = settings.getAttribute('href');
    settings.click();

    expect(mockNav).toHaveBeenCalled();
  });
});

describe('testing for Components', () => {
  test('Testing button component', async () => {
    const { buttonComponent } = await import('./components.js');
    let val = buttonComponent();
    expect(val.tagName).toBe('BUTTON');
  });
  test('Testing movie card rendering function', async () => {
    const { cardComponent } = await import('./components.js');
    const movieCard = cardComponent();
    expect(movieCard.className).toBe('movie');
  });
  test('Testing modal component', async () => {
    const { modalComponent } = await import('./components.js');
    const modal = modalComponent();
    expect(modal.className).toBe('form-container');
  });
});
describe('Testing all click event listener', () => {
  let appContainer;
  let mockNav = jest.fn();
  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;
    jest.resetModules();
    appContainer = document.querySelector('.appContainer');
  });
  test('testing buttons ', async () => {
    const { renderList } = await import('./pages.js');
    renderList();
    await import('./main.js');
    const addButton = appContainer.querySelector('.add-but');
    const overlay = appContainer.querySelector('.overlay');
    expect(overlay.classList.contains('active')).toBeFalsy();
    let clickEvent = new MouseEvent('click', { bubbles: true });
    addButton.dispatchEvent(clickEvent);
    expect(overlay.classList.contains('active')).toBeTruthy();

    const { renderSettings } = await import('./pages.js');
    renderSettings();
    await import('./main.js');
    const changeBut = appContainer.querySelector('.changeUserName-button');
    const changeUserName = appContainer.querySelector('.changeUserNameForm');
    expect(changeUserName.classList.contains('showForm')).toBeFalsy();
    changeBut.click();
    expect(changeUserName.classList.contains('showForm')).toBeTruthy();

    // expect(overlay.classList.contains('active')).toBeFalsy();
    // let clickEvent = new MouseEvent('click', { bubbles: true });
    // addButton.dispatchEvent(clickEvent);
    // expect(overlay.classList.contains('active')).toBeTruthy();
  });
  test('Testing remove movie button', async () => {
    const mockState = { route: { params: { id: 'card123' } } };
    jest.mock('./router.js', () => ({
      navigate: mockNav,
      register: jest.fn(),
    }));
    const mockHTML = `
    <div class="single-movie">
          <h2 class="movieName">Spider Man</h2>
          <p class="single-movie-year">1802</p>
          <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411" alt="" class="moviePoster">
          <p class="movieDesc">ffgf</p>
          <div class="directorContainer">
            <div class="directorLabel">Director :</div>
            <p class="directorName">ram</p>
          </div>
          <button class="remove-movie-button">Remove From Library</button>
        </div>`;
    await import('./main.js');
    const { store: importedStore } = await import('./store.js');
    console.log('if both instances are same ', store === importedStore);
    const getStateSpy = jest.spyOn(importedStore, 'getState').mockReturnValueOnce(mockState);
    const dispatchSpy = jest.spyOn(importedStore, 'dispatch').mockImplementation(() => {});
    const pushStateSpy = jest.spyOn(window.history, 'pushState').mockImplementation(() => {});
    appContainer.innerHTML = mockHTML;
    const removeMovieButton = appContainer.querySelector('.remove-movie-button');
    removeMovieButton.click();
    expect(pushStateSpy).toHaveBeenCalledTimes(1);
    expect(getStateSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(mockNav).toHaveBeenCalled();
  });
  test('Testing movie card rendering', async () => {
    await import('./main.js');
    jest.mock('./router.js', () => ({
      navigate: mockNav,
      register: jest.fn(),
    }));
    const { store: importedStore } = await import('./store.js');
    appContainer.innerHTML = `
     <div class="movies-container">
      </div><div class="movie" id="card1785564529738">
        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/adventure-movie-poster-template-design-7b13ea2ab6f64c1ec9e1bb473f345547_screen.jpg?ts=1636999411" alt="">
        <p class="movieName">Spider Man</p>
        <p class="movieYear">1810</p>
      </div></div>`;
    const dispatchSpy = jest.spyOn(importedStore, 'dispatch').mockImplementation(() => {});
    const pushStateSpy = jest.spyOn(window.history, 'pushState');
    const movie = appContainer.querySelector('.movie');
    movie.click();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(pushStateSpy).toHaveBeenCalled();
    expect(mockNav).toHaveBeenCalled();
  });
});
