import {
    combineReducers,
    configureStore,
    PreloadedState
} from '@reduxjs/toolkit'
import userReducer from './userSlice';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
    user: userReducer
})
export function setupStore(preloadedState?: PreloadedState<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
    )
)