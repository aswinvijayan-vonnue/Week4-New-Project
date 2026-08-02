beforeEach(() => {
  jest.resetModules();
});
describe('Testing all submissions', () => {
  test('handling movie form submisison', async () => {
    await import('./main.js');
    jest.mock('./movieServices.js', () => ({
      addMovie: jest.fn(),
    }));
    document.body.innerHTML = `<div class="appContainer">
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
      </div>
   `;
    const { addMovie } = await import('./movieServices.js');
    const submitEvent = new Event('submit', { bubbles: true });
    const movieForm = document.querySelector('#movieForm');
    movieForm.dispatchEvent(submitEvent);
    expect(addMovie).toHaveBeenCalled();
  });

  test('Testing change username form', async () => {
    await import('./main.js');
    document.body.innerHTML = `<div class="user-info-container">
          <h2 class="userInformation-header">User Details</h2>
          <div class="user-container">
            <p class="userName">anak</p>
            <button class="changeUserName-button">Change username</button>
          </div>
          <form action="" class="changeUserNameForm">
            <input type="text" class="username-field" name="username" value="amal">
            <button type="submit">Apply</button>
          </form>
        </div>`;

    const { store } = await import('./store.js');
    const dispatchSpy = jest.spyOn(store, 'dispatch').mockImplementation(() => {});
    const submitEvent = new Event('submit', { bubbles: true });
    const form = document.querySelector('.changeUserNameForm');
    form.dispatchEvent(submitEvent);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(form.classList.contains('showForm')).toBeFalsy();
  });
});

describe('All key event listsners', () => {
  beforeEach(() => {
    // Automatically clears history for ALL mocks before every individual test
    jest.clearAllMocks();
  });
  test('testing overlay appears and disappears based on overlay', async () => {
    await import('./main.js');
    jest.mock('./movieServices.js', () => ({
      addMovie: jest.fn(),
    }));
    const { addMovie } = await import('./movieServices.js');
    // addMovie.mockClear();
    document.body.innerHTML = `
    <div class='appContainer'>
    <div class='overlay active'><div>
    </div>`;
    const form = document.querySelector('.overlay');
    const EnterKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const EscapeKeyEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(EnterKeyEvent);
    expect(addMovie).toHaveBeenCalled();
    expect(form.classList.contains('active')).toBeTruthy();
    document.dispatchEvent(EscapeKeyEvent);
    expect(form.classList.contains('active')).toBeFalsy();
  });
});

describe('closing overlay', () => {
  test('Testing overlay closing working or not', async () => {
    document.body.innerHTML = `
     <div class='appContainer'>
     <div class="overlay active">
     <button class="close-but">X</button></div>
    </div>`;
    await import('./main.js');
    const movieContainer = document.querySelector('.appContainer');
    console.log('testing movie container value 2', movieContainer?.className);
    const button = document.querySelector('.close-but');
    console.log('in testing.....', button.className);
    const form = document.querySelector('.overlay');
    expect(form.classList.contains('active')).toBeTruthy();
    button.click();
    expect(form.classList.contains('active')).toBeFalsy();
  });
});

// test('close overlay button testing', async () => {
//   await import('./main.js');
//   document.body.innerHTML = `
//      <div class='appContainer'>

//     </div>`;

//   const closeButton = document.querySelector('.close-but');
//   const form = document.querySelector('.overlay');
//   expect(form.classList.contains('active')).toBeTruthy;
//   closeButton.click();
//   expect(form.classList.contains('active')).toBeFalsy();
// });
