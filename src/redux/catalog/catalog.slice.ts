import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface CatalogState {
  listPosition: any[];
  listUnit: any[];
}

const initialState: CatalogState = {
  listPosition: [],
  listUnit: [],
};

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setListPosition: (state: CatalogState, action: PayloadAction<any>) => {
      state.listPosition = action.payload;
    },
    setListUnit: (state: CatalogState, action: PayloadAction<any>) => {
      state.listUnit = action.payload;
    },
  },
});

export const {setListPosition, setListUnit} = catalogSlice.actions;

export default catalogSlice.reducer;
