export function createStore(initialState, reducer) {
  let state = initialState;
  let listeners = [];
  const getState = () => {
    return state;
  };
  const dispath = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((singleLi) => singleLi != listener);
    };
  };
  return { getState, dispath, subscribe };
}
