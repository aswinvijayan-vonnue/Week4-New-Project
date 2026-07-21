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
      console.log('state', state);
      localStorage.setItem('store', JSON.stringify(state));
      // Notify subscribers
      listeners.forEach((listener) => listener(state));
    },
    subscribe(listener) {
      listeners.push(listener);
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
  console.log(state);
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
      return state;
  }
}
let instance = localStorage.getItem('store');
console.log(instance);
let baseState;
if (instance) {
  baseState = JSON.parse(instance);
}
export const store = instance
  ? createStore(baseState, reducer)
  : createStore(initialState, reducer);

function onRouteChange(path, params) {
  store.dispatch({
    type: 'ROUTE_CHANGED',
    payload: {
      path,
      params,
    },
  });
}
// store.subscribe((state) => {
//   console.log(state.route);
// });
