import { applyMiddleware, createStore } from "redux";
import RootReducer from "./reducers/RootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
// store.subscribe(() => console.log(store.getState()));

export type RootStore = ReturnType<typeof RootReducer>;

export default store;