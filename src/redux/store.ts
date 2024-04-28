import { combineReducers, configureStore } from "@reduxjs/toolkit";

import globalInfoSliceReducer from "./global/global.slice";

const rootReducer = combineReducers({
  global: globalInfoSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;