import { useMemo } from "react";
import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import apiMiddleware from "./middleware";
import rootReducer from "./reducers/root";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store;

const initStore = (preloadedState = rootReducer) => {
  return createStore(
    preloadedState,
    composeWithDevTools(applyMiddleware(apiMiddleware))
  );
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(rootReducer) {
  const store = useMemo(() => initializeStore(rootReducer), [rootReducer]);
  return store;
}
