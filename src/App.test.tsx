import App from "./App";
import { screen } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "./testRender";
import { initialState } from "./features/pokemonSlice";
import { setupStore } from "./Store";
import {
  PokemonResponse,
  POKEMON_FAIL,
  POKEMON_LOADING,
  POKEMON_SUCCESS,
} from "./features/PokemonTypes";
import { AxiosError } from "axios";

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

test("Should initially set pokemon to IDEL", () => {
  const store = setupStore();
  const pokemon = store.getState().pokemon;
  expect(pokemon).toEqual(initialState);
});

test("Should render loader if request is pending", async () => {
  renderWithProviders(<App />, {
    preloadedState: {
      pokemon: {
        status: POKEMON_LOADING,
        data: {} as PokemonResponse,
      },
    },
  });

  screen.getByRole("loader");
});

test("Should render abilities' pokemon lists if request fulfilled", async () => {
  // const store = setupStore({
  //   pokemon: {
  //     status: POKEMON_SUCCESS,
  //     data: expectedPokemonResponse,
  //   },
  // });

  // render(
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // );

  renderWithProviders(<App />, {
    preloadedState: {
      pokemon: {
        status: POKEMON_SUCCESS,
        data: expectedPokemonResponse,
      },
    },
  });

  screen.getByText(/Abilities/i);
  const abilitiesList = screen.getAllByRole("ability");
  expect(abilitiesList.length).toEqual(
    expectedPokemonResponse.abilities.length
  );
  expect(abilitiesList[0]).toHaveTextContent(
    expectedPokemonResponse.abilities[0].ability.name
  );
});

test("Should render error message if request is rejected", async () => {
  renderWithProviders(<App />, {
    preloadedState: {
      pokemon: {
        status: POKEMON_FAIL,
        data: {} as PokemonResponse,
        error: {} as AxiosError,
      },
    },
  });

  screen.getByRole("error");
});

// https://bionicjulia.com/blog/writing-jest-tests-redux-toolkit-slice
//https://fabiomarcoccia.medium.com/redux-toolkit-test-slice-and-actions-a6e88dfecb03
// https://github.com/reduxjs/redux-mock-store
