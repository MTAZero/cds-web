import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  number: number;
}

const initialState: GlobalState = {
  number: 0,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setNumber: (state: GlobalState, action: PayloadAction<number>) => {
      state.number = action.payload;
    },
    incNumber: (state: GlobalState) => {
      state.number = state.number + 1;
    },
    decNumber: (state: GlobalState) => {
      state.number = state.number - 1;
    },
  },
});

export const { setNumber, incNumber, decNumber } = globalSlice.actions;

export default globalSlice.reducer;
