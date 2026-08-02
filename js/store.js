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

    default:
      return { ...state };
  }
}
let instance = localStorage.getItem('store');
let baseState;
if (instance) {
  baseState = JSON.parse(instance);
}
export const store = instance
  ? createStore(baseState, reducer)
  : createStore(initialState, reducer);

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
// store.subscribe((state) => {
//   console.log(state.route);
// });
