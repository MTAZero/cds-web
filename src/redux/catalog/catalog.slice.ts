import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {APIServices, toArray} from "utils";

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
export const getListVehicleAPI = () => {
  return async dispatch => {
    try {
      const res = await APIServices.QuanLyXe.getListXe();
      const listVehicle = toArray(res?.items);
      dispatch(setListVehicle(listVehicle));
    } catch (error) {
      dispatch(setListVehicle([]));
    }
  };
};
export const getListUnitAPI = () => {
  return async dispatch => {
    try {
      const res = await APIServices.QuanTri.getListUnit({
        pageIndex: 1,
        pageSize: 50,
      });
      const listUnit = toArray(res?.items);
      dispatch(setListUnit(listUnit));
    } catch (error) {
      dispatch(setListUnit([]));
    }
  };
};

export default catalogSlice.reducer;
