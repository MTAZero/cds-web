import { combineReducers, configureStore } from "@reduxjs/toolkit";

import globalInfoSliceReducer from "./global/global.slice";
import authSliceReducer from "./auth/auth.slice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage/session";

const rootReducer = combineReducers({
  global: globalInfoSliceReducer,
  auth: authSliceReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.REACT_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
