import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {APIServices, toArray} from "utils";

export interface CatalogState {
  listPosition: any[];
  listUnit: any[];
  listVehicle: any[];
  listTask: any[];
  listFuel: any[];
  listPerson: any[];
}

const initialState: CatalogState = {
  listPosition: [],
  listUnit: [],
  listVehicle: [],
  listTask: [],
  listFuel: [],
  listPerson: [],
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
    setListTask: (state: CatalogState, action: PayloadAction<any>) => {
      state.listTask = action.payload;
    },
    setListFuel: (state: CatalogState, action: PayloadAction<any>) => {
      state.listFuel = action.payload;
    },
    setListPerson: (state: CatalogState, action: PayloadAction<any>) => {
      state.listPerson = action.payload;
    },
  },
});

export const {
  setListPosition,
  setListUnit,
  setListVehicle,
  setListTask,
  setListFuel,
  setListPerson,
} = catalogSlice.actions;
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
export const getListTaskAPI = () => {
  return async dispatch => {
    try {
      const res = await APIServices.QuanLyNhiemVu.getListNhiemVu();
      const listTask = toArray(res?.items);
      dispatch(setListTask(listTask));
    } catch (error) {
      dispatch(setListTask([]));
    }
  };
};
export const getListFuelAPI = () => {
  return async dispatch => {
    try {
      const res = await APIServices.QuanLyNhienLieu.getListNhienLieu();
      const listFuel = toArray(res?.items);
      dispatch(setListFuel(listFuel));
    } catch (error) {
      dispatch(setListFuel([]));
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
export const getListPersonAPI = (pageIndex = 1, pageSize = 200) => {
  return async dispatch => {
    try {
      const res = await APIServices.QuanTri.getListUser({
        pageIndex: pageIndex,
        pageSize: pageSize,
      });
      const listPerson = toArray(res?.items)?.filter(e => e?.isPersonal);
      dispatch(setListPerson(listPerson));
    } catch (error) {
      dispatch(setListPerson([]));
    }
  };
};

export default catalogSlice.reducer;
