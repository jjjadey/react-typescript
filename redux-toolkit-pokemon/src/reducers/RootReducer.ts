import { combineReducers } from "redux";
import pokemonReducer from "../features/pokemonSlice";

const RootReducer = combineReducers({
    pokemon: pokemonReducer,

});

export default RootReducer