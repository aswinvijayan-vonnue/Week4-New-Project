import fs from 'fs';
import path from 'path';

beforeEach(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  document.documentElement.innerHTML = html;
});
describe('checking movies services functionalities', () => {
  test('testing add movies functionalities', async () => {
    jest.mock('./pages.ts', () => ({
      renderList: jest.fn(),
    }));
    let appContainer = document.querySelector('.appContainer');
    expect(appContainer).not.toBeNull();
    console.log(appContainer!.className);
    appContainer!.innerHTML = `
     <div class="overlay active"><div class="form-container">
        <div class="formHead">
          <h3>Add Movie to the list</h3>
          <button class="close-but">X</button>
        </div>
        <form action="" id="movieForm">
          <div class="input-container">
            <label for="movieName">Movie Name</label>
            <input type="text" id="movieName" placeholder="Movie Name" name="movie" required="">
          </div>
          <div class="input-container">
            <label for="director">Director</label>
            <input type="text" id="director" name="director" placeholder="Director Name">
          </div>
          <div class="input-container">
            <label for="year">Year</label>
            <input type="number" min="1800" name="year">
          </div>
          <div class="input-container">
            <textarea name="description" id="description" placeholder="Describe your movie"></textarea>
          </div>
          <div></div>
          <div class="input-container">
            <button type="submit" class="add-but">Add Movie</button>
          </div>
        </form>
      </div></div>
      `;

    const { addMovie } = await import('./movieServices');
    const { store } = await import('./store');
    const { renderList } = await import('./pages');
    const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(() => {});
    const overlay = appContainer!.querySelector('.overlay');
    // console.log(overlay.className);
    expect(overlay).not.toBeNull();
    expect(overlay!.classList.contains('active')).toBeTruthy();
    addMovie();
    expect(overlay!.classList.contains('active')).toBeFalsy();
  });
});
