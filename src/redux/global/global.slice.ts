import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface GlobalState {
  modalChangePasswordState: boolean;
  isOpenModal: boolean;
}

const initialState: GlobalState = {
  modalChangePasswordState: false,
  isOpenModal: false,
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
    setIsOpenModalRedux: (
      state: GlobalState,
      action: PayloadAction<boolean>
    ) => {
      state.isOpenModal = action.payload;
    },
  },
});

export const {setModalChangePasswordState, setIsOpenModalRedux} =
  globalSlice.actions;

export default globalSlice.reducer;
