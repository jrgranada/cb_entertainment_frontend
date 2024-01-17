import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (_, thunkAPI) => {
    try {

      const response = await fetch("https://localhost:7005/api/spotify/test", {
        method: "GET",
        cache: "no-cache"
      });

      const data = await response.json();
      return data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

type CounterState = {
  value: number;
};

const initialState = {
  value: 0,
} as CounterState;

export const counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
  },

});

export const {
  increment,
  incrementByAmount,
  decrement,
  decrementByAmount,
  reset,
} = counter.actions;
export default counter.reducer;
