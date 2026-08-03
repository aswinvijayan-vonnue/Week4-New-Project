import { navigate, routes } from './router';
// import { initRegister } from './main.js';
import fs from 'fs';
import path from 'path';

beforeEach(() => {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  document.documentElement.innerHTML = html;
});

describe('Router tests', () => {
  let appContainer: HTMLElement | null;
  beforeEach(async () => {
    const { default: initRegister } = await import('./main');
    initRegister();
    appContainer = document.querySelector('.appContainer');
  });

  test('Asserting correct component is rendered', () => {
    const settingsSpy = jest.spyOn(routes, '/settings');
    if (!appContainer) throw new Error('App container not found');
    navigate('/settings');
    expect(settingsSpy).toHaveBeenCalled();
    // expect(window.location.pathname).toBe('/movieList');
    const div = appContainer.querySelector('#settings');
    if (!div) throw new Error('Settings div not found');
    expect(div.id).toBe('settings');
  });
  test('Testing extract search  parameter', async () => {
    const path = 'https://example.com/users/123';
    const { extractSearchPara } = await import('./router');
    expect(extractSearchPara(path)).toBe('123');
  });
  test('Testing /details with id', () => {
    const path = 'https://example.com/users/123';
    const detailRouteSpy = jest.spyOn(routes, '/details');
    navigate(path);
    expect(detailRouteSpy).toHaveBeenCalled();
    expect(detailRouteSpy).toHaveBeenCalledWith('123');
  });
  test('Testing a path that is not registered yet', () => {
    const path = '/contact';
    const consoleSpy = jest.spyOn(console, 'log');
    navigate(path);
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('404:error');
  });

  // test('testing rendering when search parameter is there', () => {
  //   // const path = '/details/:card1784621938934';
  //   navigate('/movieList');
  //   console.log('from test: ', appContainer.innerHTML);
  //   let app = document.querySelector('.appContainer');
  //   const div = appContainer.querySelector('#list');
  //   console.log('hiiii', div);
  //   expect(div).not.toBeNull();
  //   expect(div).toHaveAttribute('id', 'list');
  // });
});
