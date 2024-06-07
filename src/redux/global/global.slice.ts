import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  modalChangePasswordState: boolean;
}

const initialState: GlobalState = {
  modalChangePasswordState: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setModalChangePasswordState: (
      state: GlobalState,
      action: PayloadAction<boolean>
    ) => {
      state.modalChangePasswordState = action.payload;
    },
  },
});

export const { setModalChangePasswordState } = globalSlice.actions;

export default globalSlice.reducer;
