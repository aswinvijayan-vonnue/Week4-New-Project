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

    default:
      return state;
  }
}
export const store = createStore(initialState, reducer);

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
