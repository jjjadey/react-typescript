import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import axios, {AxiosResponse} from 'axios';

interface MyData {
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
    const response: AxiosResponse = await axios.get(`https://reqres.in/api/users/${userId}`)
    console.log(response.data)
    return response.data as MyData
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
      state.name =action.payload.data.first_name
    })
  }
})

export const selectUserName = (state: RootState) => state.user.name
export const selectUserFetchStatus = (state: RootState) => state.user.status

export default userSlice.reducer