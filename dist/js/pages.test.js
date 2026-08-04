import fs from 'fs';
import path from 'path';
import { renderDetails, renderHome, renderList, renderSettings } from './pages';
describe('Testing each page rendering', () => {
    let appContainer;
    beforeEach(() => {
        const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
        document.documentElement.innerHTML = html;
    });
    test('Testing home page rendering', async () => {
        const { renderHome } = await import('./pages');
        appContainer = document.querySelector('.appContainer');
        // expect(appContainer.querySelector('#home')).toBeNull();
        renderHome();
        if (!appContainer)
            throw new Error('App container is not  found');
        expect(appContainer.querySelector('#home')).not.toBeNull();
    });
    test('Testing Movie List page rendering', async () => {
        const { renderSettings } = await import('./pages');
        appContainer = document.querySelector('.appContainer');
        if (!appContainer)
            throw new Error('App container is not  found');
        expect(appContainer.querySelector('#settings')).toBeNull();
        renderSettings();
        expect(appContainer.querySelector('#settings')).not.toBeNull();
    });
    test('testing render list', async () => {
        const movies = {
            route: { path: '/', params: {} },
            movies: [
                {
                    id: '123',
                    movie: 'abc',
                    year: '1809',
                    imgSrc: 'img.png',
                    director: 'abcde',
                    description: 'hellooo',
                },
            ],
        };
        const { renderList } = await import('./pages');
        appContainer = document.querySelector('.appContainer');
        const { store } = await import('./store');
        const getStateSpy = jest.spyOn(store, 'getState').mockReturnValue(movies);
        if (!appContainer)
            throw new Error('App container is not  found');
        expect(appContainer.querySelector('#list')).toBeFalsy();
        let val = renderList();
        const empty = appContainer.querySelector('.emptyMovie');
        expect(appContainer.querySelector('.emptyMovie')).not.toBeNull();
        expect(appContainer.querySelector('.emptyMovie')?.classList.contains('hidden')).toBeTruthy();
        // expect(val).toBeTruthy();
        expect(getStateSpy).toHaveBeenCalled();
        expect(appContainer.querySelector('#list')).toBeTruthy();
        // getStateSpy.mockReturnValueOnce({ movies: [] });
        // expect(appContainer.querySelector('.emptyMovie').classList.contains('hidden')).toBeTruthy();
        // renderList();
        // expect(appContainer.querySelector('.emptyMovie').classList.contains('hidden')).toBeFalsy();
    });
    test('Testing render list with empty movies', async () => {
        const movies = {
            route: { path: '/', params: {} },
            movies: [],
        };
        const { renderList } = await import('./pages');
        appContainer = document.querySelector('.appContainer');
        const { store } = await import('./store');
        const getStateSpy = jest.spyOn(store, 'getState').mockReturnValue(movies);
        renderList();
        if (!appContainer)
            throw new Error('App container is not  found');
        expect(appContainer.querySelector('.emptyMovie')).not.toBeNull();
        expect(appContainer.querySelector('.emptyMovie')?.classList.contains('hidden')).toBeFalsy();
        expect(getStateSpy).toHaveBeenCalled();
    });
    test('testing render settings', async () => {
        const response = {
            route: { path: '/', params: {} },
            username: 'amal',
        };
        // const response = { username: 'amal' };
        const { renderSettings } = await import('./pages');
        appContainer = document.querySelector('.appContainer');
        const { store } = await import('./store');
        const getStateSpy = jest.spyOn(store, 'getState').mockReturnValueOnce(response);
        if (!appContainer)
            throw new Error('App container is not  found');
        expect(appContainer.querySelector('#settings')).toBeFalsy();
        renderSettings();
        expect(appContainer.querySelector('#settings')).toBeTruthy();
        expect(getStateSpy).toHaveBeenCalled();
        const userNameTag = appContainer.querySelector('.userName');
        expect(userNameTag).not.toBeNull();
        expect(userNameTag?.textContent).toBe('amal');
    });
    test('testing render details', async () => {
        const information = {
            route: { path: '/', params: {} },
            movies: [
                {
                    id: 'mv123',
                    movie: 'movie',
                    year: '1900',
                    imgSrc: 'img.png',
                    description: 'abcd',
                    director: 'abcd',
                },
            ],
        };
        const { renderDetails } = await import('./pages');
        appContainer = document.querySelector('.appContainer');
        const { store } = await import('./store');
        const getStateSpy = jest.spyOn(store, 'getState').mockReturnValueOnce(information);
        if (!appContainer)
            throw new Error('App container not found');
        expect(appContainer.querySelector('#details')).toBeFalsy();
        renderDetails('mv123');
        expect(getStateSpy).toHaveBeenCalled();
        expect(appContainer.querySelector('#details')).toBeTruthy();
        expect(renderDetails('mv')).toBeFalsy();
    });
});
describe('Testing page rendering in each edge case', () => {
    test('testing when there is no card element to render', async () => {
        document.body.innerHTML = `<div class="appContainer"></div>`;
        const { cardComponent } = await import('./components');
        expect(() => cardComponent()).toThrow();
    });
    test('testing when there is no modal element to render', async () => {
        document.body.innerHTML = `<div class="appContainer"></div>`;
        const { modalComponent } = await import('./components');
        expect(() => modalComponent()).toThrow();
    });
    test('testing case when there is no appContainer', async () => {
        document.body.innerHTML = ``;
        const components = await import('./components');
        const butSpy = jest.spyOn(components, 'buttonComponent');
        await import('./pages');
        renderList();
        expect(butSpy).not.toHaveBeenCalled();
        expect(renderHome()).toBeFalsy();
        expect(renderDetails()).toBeFalsy();
        expect(renderSettings()).toBeFalsy();
    });
    test('testing case when there is no home div', async () => {
        document.body.innerHTML = `<div class="appContainer"></div>`;
        await import('./pages');
        expect(renderHome()).toBeFalsy();
    });
});
