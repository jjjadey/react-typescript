export const POKEMON_LOADING = "POKEMON_LOADING";
export const POKEMON_FAIL = "POKEMON_FAIL";
export const POKEMON_SUCCESS = "POKEMON_SUCCESS";

export interface PokemonLoading {
    type: typeof POKEMON_LOADING
}

export interface PokemonFail {
    type: typeof POKEMON_FAIL
}

export interface PokemonSuccess {
    type: typeof POKEMON_SUCCESS,
    payload: PokemonResponse
}


export type PokemonResponse = {
    abilities: PokemonAbility[],
    base_experience: number
    forms: PokemonForms[],
    height: number,
    game_indices: PokemonGameIndices[],
    sprites: PokemonSprites,
    stats: PokemonStat[]
}

type PokemonAbility = {
    ability: {
        name: string
        url: string
    },
    is_hidden: boolean,
    slot: number
}

type PokemonForms = {
    name: string
    url: string
}

type PokemonGameIndices ={
    game_index: number,
    version: {
      name: string,
      url: string
    }
}

type PokemonSprites = {
    front_default: string
}

type PokemonStat = {
    base_stat: number,
    stat: {
        name: string
    }
}

export type PokemonDispatchTypes = PokemonLoading | PokemonFail | PokemonSuccess