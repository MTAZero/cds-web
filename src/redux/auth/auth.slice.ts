import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Permission } from "../../types";
import { StoreService } from "../../utils";

export interface AuthState {
  isLogin: boolean;
  info: {
    name: string;
    username: string;
    unit: string;
    role: string;
    type: string;
    rank: string;
  } | null;
  permission: Array<Permission>;
  token: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  info: null,
  permission: [],
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state: AuthState,
      action: PayloadAction<{
        name: string;
        username: string;
        role: string;
        type: string;
        unit: string;
        rank: string;
      }>
    ) => {
      state.isLogin = true;
      state.info = action.payload;
    },
    updatePermisson: (
      state: AuthState,
      action: PayloadAction<Array<Permission>>
    ) => {
      if (state.isLogin) state.permission = action.payload;
    },
    logout: (state: AuthState) => {
      state.isLogin = false;
      state.info = null;
      state.permission = [];
      StoreService.setAuthToken(null);
    },
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
      StoreService.setAuthToken(action.payload);
    },
    updateInfo: (
      state: AuthState,
      action: PayloadAction<{
        name: string;
        username: string;
        role: string;
        type: string;
        unit: string;
        rank: string;
      }>
    ) => {
      state.isLogin = true;
      state.info = action.payload;
    },
  },
});

export const { loginSuccess, updatePermisson, logout, setToken, updateInfo } =
  authSlice.actions;

export default authSlice.reducer;
