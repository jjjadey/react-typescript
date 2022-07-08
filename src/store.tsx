import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const createStore = () =>
  configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
  });
export const store = createStore();


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;