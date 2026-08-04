function createStore(initialState, reducer) {
    let state = initialState;
    const listeners = [];
    return {
        getState() {
            return state;
        },
        dispatch(action) {
            // Update state
            state = reducer(state, action);
            localStorage.setItem('store', JSON.stringify(state));
            // Notify subscribers
            listeners.forEach((listener) => listener(state));
        },
        subscribe(listener) {
            listeners.push(listener);
            return listeners.length;
            // TODO: Return unsubscribe function
        },
    };
}
const initialState = {
    route: {
        path: '/',
        params: {},
    },
};
function reducer(state, action) {
    switch (action.type) {
        case 'ROUTE_CHANGED':
            return {
                ...state,
                route: action.payload,
            };
        case 'CREATE_MOVIE':
            const currentMovies = state.movies || [];
            return {
                ...state,
                movies: [...currentMovies, action.payload],
            };
        case 'USER_CHANGED':
            return {
                ...state,
                username: action.payload,
            };
        case 'DELETE_MOVIE':
            const existingMovies = state.movies || [];
            const updatedMovies = existingMovies.filter((movie) => movie.id !== action.payload);
            return {
                ...state,
                movies: updatedMovies,
            };
    }
}
let inst = localStorage.getItem('store');
let instance;
if (inst && typeof inst === 'string') {
    instance = JSON.parse(inst);
}
else {
    instance = null;
}
// let instance: StateType = localStorage.getItem('store')
//   ? JSON.parse(localStorage.getItem('store'))
//   : null;
export const store = instance ? createStore(instance, reducer) : createStore(initialState, reducer);
export function onRouteChange(path, params) {
    store.dispatch({
        type: 'ROUTE_CHANGED',
        payload: {
            path,
            params,
        },
    });
    return 'Success';
}
