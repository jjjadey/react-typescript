
import axios, { AxiosError, AxiosResponse } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PokemonResponse, PokemonState, POKEMON_FAIL, POKEMON_IDEL, POKEMON_LOADING, POKEMON_SUCCESS } from "./PokemonTypes";


export const getPokemon = createAsyncThunk('getPokemon',
    async (name: string, { rejectWithValue }) => {
        try {
            const res: AxiosResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            // console.log('>>>response', res.data);
            return res.data;
        }
        catch (err) {
            const error = err as AxiosError
            // console.log('>>>error response', error.response);
            return rejectWithValue(error)
        }
    }

)

export const initialState: PokemonState = {
    data: {} as PokemonResponse,
    status: POKEMON_IDEL
}

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPokemon.pending, (state) => {
            state.status = POKEMON_LOADING;
        });
        builder.addCase(getPokemon.fulfilled, (state, action) => {
            state.status = POKEMON_SUCCESS;
            state.data = action.payload;
        });
        builder.addCase(getPokemon.rejected, (state, action) => {
            state.status = POKEMON_FAIL;
            const error: AxiosError = action.payload as AxiosError
            state.error = error;
        });

    }
})

export default pokemonSlice.reducer;