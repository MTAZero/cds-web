import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface CatalogState {
  listPosition: any[];
  listUnit: any[];
  listVehicle: any[];
}

const initialState: CatalogState = {
  listPosition: [],
  listUnit: [],
  listVehicle: [],
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
    setListVehicle: (state: CatalogState, action: PayloadAction<any>) => {
      state.listVehicle = action.payload;
    },
  },
});

export const {setListPosition, setListUnit, setListVehicle} =
  catalogSlice.actions;
export const getListDoiTuongAPI = () => {
  return async dispatch => {
    try {
      // const listDoiTuongKCB = (await catalogService.getListDoiTuongKCB()) || [];
      // dispatch(setListDoiTuongKCB(listDoiTuongKCB));
    } catch (error) {}
  };
};

export default catalogSlice.reducer;
