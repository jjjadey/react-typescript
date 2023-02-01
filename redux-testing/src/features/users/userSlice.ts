import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
export interface MyData {
    data: {
        id: number,
        email: string,
        first_name: string,
        last_name: string,
        avatar: string
    },
    support: {
        url: string,
        text: string
    }
}

export const fetchUser = createAsyncThunk('user/fetchById', async (userId: number) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`)
    const data = await response.json() as MyData
    return data
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
            state.name = action.payload.data.first_name
        })
    }
})

export const selectUserName = (state: RootState) => state.user.name
export const selectUserFetchStatus = (state: RootState) => state.user.status

export default userSlice.reducer