import type { MovieType, StateType, ActionType } from './types.js';
type reducerFunction = (arg1: StateType, arg2: ActionType) => StateType;

function createStore(initialState: StateType, reducer: reducerFunction) {
  let state = initialState;
  const listeners: ((arg: StateType) => void)[] = [];
  return {
    getState() {
      return state;
    },
    dispatch(action: ActionType) {
      // Update state
      state = reducer(state, action);
      localStorage.setItem('store', JSON.stringify(state));
      // Notify subscribers
      listeners.forEach((listener) => listener(state));
    },
    subscribe(listener: (arg: StateType) => void) {
      listeners.push(listener);
      return listeners.length;
      // TODO: Return unsubscribe function
    },
  };
}

const initialState: StateType = {
  route: {
    path: '/',
    params: {},
  },
};
function reducer(state: StateType, action: ActionType) {
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
let instance: StateType | null;
if (inst && typeof inst === 'string') {
  instance = JSON.parse(inst);
} else {
  instance = null;
}
// let instance: StateType = localStorage.getItem('store')
//   ? JSON.parse(localStorage.getItem('store'))
//   : null;

export const store = instance ? createStore(instance, reducer) : createStore(initialState, reducer);

export function onRouteChange(path: string, params: Record<string, string>) {
  store.dispatch({
    type: 'ROUTE_CHANGED',
    payload: {
      path,
      params,
    },
  });
  return 'Success';
}
