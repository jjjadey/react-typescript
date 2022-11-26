import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { configureStore, PreloadedState } from "@reduxjs/toolkit";

const middlewares = [thunk];

export function setupStore(preloadedState?: PreloadedState<RootStore>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: middlewares,
  });
}

export function getStoreWithState(preloadedState?: RootStore) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
// store.subscribe(() => console.log(store.getState()));

export type RootStore = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default store;
