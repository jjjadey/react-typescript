import { AxiosError } from "axios";

export const POKEMON_IDEL = "POKEMON_IDEL";
export const POKEMON_LOADING = "POKEMON_LOADING";
export const POKEMON_FAIL = "POKEMON_FAIL";
export const POKEMON_SUCCESS = "POKEMON_SUCCESS";

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

type PokemonGameIndices = {
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

export type PokemonStatus = typeof POKEMON_IDEL | typeof POKEMON_LOADING | typeof POKEMON_FAIL | typeof POKEMON_SUCCESS

export type PokemonState = {
    data: PokemonResponse,
    status: PokemonStatus,
    error?: AxiosError,
}