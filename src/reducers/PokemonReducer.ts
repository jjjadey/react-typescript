import { PokemonResponse, POKEMON_FAIL, POKEMON_LOADING, POKEMON_SUCCESS } from "../actions/PokemonTypes";

interface DefaultStateI {
    loading: boolean,
    pokemon?: PokemonResponse
}

const defaultState: DefaultStateI = {
    loading: false
};

const pokemonReducer = (state: DefaultStateI = defaultState, action: any): DefaultStateI => {

    switch (action.type) {
        case POKEMON_FAIL:
            return {
                loading: false,
            }
        case POKEMON_LOADING:
            return {
                loading: true,
            }
        case POKEMON_SUCCESS:
            return {
                loading: false,
                pokemon: action.payload
            }
        default:
            return state
    }
};

export default pokemonReducer;