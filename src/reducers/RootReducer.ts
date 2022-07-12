import { combineReducers } from "redux";
import pokemonReducer from "../features/pokemonSlice";

const rootReducer = combineReducers({
    pokemon: pokemonReducer,

});

export default rootReducer