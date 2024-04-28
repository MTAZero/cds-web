import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Permission } from "../../types";

export interface AuthState {
  isLogin: boolean;
  info: {
    name: string;
    username: string;
  } | null;
  permission: Array<Permission>;
}

const initialState: AuthState = {
  isLogin: false,
  info: null,
  permission: [],
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
      console.log("logout");
      
      state.isLogin = false;
      state.info = null;
      state.permission = [];
    },
  },
});

export const { loginSuccess, updatePermisson, logout } = authSlice.actions;

export default authSlice.reducer;
