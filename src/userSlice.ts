import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from './store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const mock = new MockAdapter(axios, { delayResponse: 2000 });
    const url = '/user';
    mock.onGet(url).reply(200, { name: 'John' });

    try {
        const response = await axios.get(url);
        console.log('>>response', response)
        return response.data.name;
    } catch (error) {
        return { name: '' };
    }


})

interface UserState {
    name: string
    status: 'idle' | 'loading' | 'complete'
}

const initialState: UserState = {
    name: 'No user',
    status: 'idle'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status = 'complete'
            state.name = action.payload
        })
    }
})

export const selectUser = (state: RootState) => state.user.name
export const selectUserFetchStatus = (state: RootState) => state.user.status

export default userSlice.reducer