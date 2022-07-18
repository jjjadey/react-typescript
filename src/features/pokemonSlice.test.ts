import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getPokemon, initialState } from "./pokemonSlice";
import { getStoreWithState, RootStore } from "../Store";
import { PokemonResponse, POKEMON_FAIL, POKEMON_IDEL, POKEMON_LOADING, POKEMON_SUCCESS, } from "./PokemonTypes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const state: RootStore = {
    pokemon: initialState
};
const expectedPokemonResponse: PokemonResponse = {
    abilities: [
        {
            ability: {
                name: "static",
                url: "https://pokeapi.co/api/v2/ability/9/",
            },
            is_hidden: false,
            slot: 1,
        },
        {
            ability: {
                name: "lightning-rod",
                url: "https://pokeapi.co/api/v2/ability/31/",
            },
            is_hidden: true,
            slot: 3,
        },
    ],
    base_experience: 112,
    forms: [
        {
            name: "pikachu",
            url: "https://pokeapi.co/api/v2/pokemon-form/25/",
        },
    ],
    height: 4,
    game_indices: [
        {
            game_index: 84,
            version: {
                name: "red",
                url: "https://pokeapi.co/api/v2/version/1/",
            },
        },
        {
            game_index: 84,
            version: {
                name: "blue",
                url: "https://pokeapi.co/api/v2/version/2/",
            },
        },
        {
            game_index: 84,
            version: {
                name: "yellow",
                url: "https://pokeapi.co/api/v2/version/3/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "gold",
                url: "https://pokeapi.co/api/v2/version/4/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "silver",
                url: "https://pokeapi.co/api/v2/version/5/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "crystal",
                url: "https://pokeapi.co/api/v2/version/6/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "ruby",
                url: "https://pokeapi.co/api/v2/version/7/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "sapphire",
                url: "https://pokeapi.co/api/v2/version/8/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "emerald",
                url: "https://pokeapi.co/api/v2/version/9/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "firered",
                url: "https://pokeapi.co/api/v2/version/10/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "leafgreen",
                url: "https://pokeapi.co/api/v2/version/11/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "diamond",
                url: "https://pokeapi.co/api/v2/version/12/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "pearl",
                url: "https://pokeapi.co/api/v2/version/13/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "platinum",
                url: "https://pokeapi.co/api/v2/version/14/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "heartgold",
                url: "https://pokeapi.co/api/v2/version/15/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "soulsilver",
                url: "https://pokeapi.co/api/v2/version/16/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "black",
                url: "https://pokeapi.co/api/v2/version/17/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "white",
                url: "https://pokeapi.co/api/v2/version/18/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "black-2",
                url: "https://pokeapi.co/api/v2/version/21/",
            },
        },
        {
            game_index: 25,
            version: {
                name: "white-2",
                url: "https://pokeapi.co/api/v2/version/22/",
            },
        },
    ],
    sprites: {
        front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    },
    stats: [
        { base_stat: 35, stat: { name: "hp" } },
        { base_stat: 55, stat: { name: "attack" } },
        { base_stat: 40, stat: { name: "defense" } },
        { base_stat: 50, stat: { name: "special-attack" } },
        { base_stat: 50, stat: { name: "special-defense" } },
        { base_stat: 90, stat: { name: "speed" } },
    ],
};

describe("thunks", () => {
    describe("getPokemon with mock dispatch", () => {
        it("Should getPokemon fulfilled", async () => {
            const dispatch = jest.fn();
            const name = "pikachu";
            const thunk = getPokemon(name);
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock;
            expect(calls).toHaveLength(2);
            //pending
            expect(calls[0][0].type).toEqual("getPokemon/pending");
            //fulfilled
            expect(calls[1][0].type).toEqual("getPokemon/fulfilled");
            expect(calls[1][0].payload.forms[0].name).toEqual(expectedPokemonResponse.forms[0].name); // check with payload
        });
        it("Should getPokemon rejected if not found pokemon data", async () => {
            const dispatch = jest.fn();
            const name = "pikachuuuu";
            const thunk = getPokemon(name);
            await thunk(dispatch, () => state, undefined);
            const { calls } = dispatch.mock;
            expect(calls).toHaveLength(2);
            //pending
            expect(calls[0][0].type).toEqual("getPokemon/pending");
            //rejected
            expect(calls[1][0].type).toEqual("getPokemon/rejected");
            expect(calls[1][0].payload.response.status).toEqual(404);
            expect(calls[1][0].payload.response.data).toEqual('Not Found');
        })
    });

    describe("getPokemon with mock redux store", () => {
        it("Should getPokemon fulfilled", async () => {
            const store = mockStore(state);
            const name = "pikachu";
            await store.dispatch(getPokemon(name) as any);
            const actions = store.getActions();
            expect(actions).toHaveLength(2);
            //pending
            expect(actions[0].type).toEqual("getPokemon/pending");
            //fulfilled
            expect(actions[1].type).toEqual("getPokemon/fulfilled");
            expect(actions[1].payload.forms[0].name).toEqual(expectedPokemonResponse.forms[0].name); // check with payload
        });
        it("Should getPokemon rejected if not found pokemon data", async () => {
            const store = mockStore(state);
            const name = "pikachuuuu";
            await store.dispatch(getPokemon(name) as any);
            const actions = store.getActions();
            expect(actions).toHaveLength(2);
            //pending
            expect(actions[0].type).toEqual("getPokemon/pending");
            //rejected
            expect(actions[1].payload.response.status).toEqual(404);
            expect(actions[1].payload.response.data).toEqual('Not Found');
        });
    });
    describe("getPokemon with full redux store", () => {
        it("Should getPokemon fulfilled", async () => {
            const store = getStoreWithState(state);
            const name = "pikachu";
            await store.dispatch(getPokemon(name));
            const pokemon = store.getState().pokemon;
            expect(pokemon.status).toEqual(POKEMON_SUCCESS);
            expect(pokemon.data.forms[0].name).toEqual(expectedPokemonResponse.forms[0].name);
        });
        it("Should getPokemon rejected", async () => {
            const store = getStoreWithState(state);
            const name = "pikachuuuu";
            await store.dispatch(getPokemon(name));
            const pokemon = store.getState().pokemon;
            expect(pokemon.status).toEqual(POKEMON_FAIL);
            expect(pokemon.error?.response?.status).toEqual(404);
            expect(pokemon.error?.response?.data).toEqual('Not Found');
        });
        it("Should be pending before fulfilled", async () => {
            const store = getStoreWithState(state);
            expect(store.getState().pokemon.status).toEqual(POKEMON_IDEL);
            const name = "pikachu";
            const action = store.dispatch(getPokemon(name));
            expect(store.getState().pokemon.status).toEqual(POKEMON_LOADING);
            await action;
            expect(store.getState().pokemon.status).toEqual(POKEMON_SUCCESS);
        });
    });
});
