import {combineReducers, configureStore} from "@reduxjs/toolkit";

import globalSliceReducer from "./global/global.slice";
import authSliceReducer from "./auth/auth.slice";
import {setupListeners} from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import catalogSliceReducer from "./catalog/catalog.slice";
import {uploadFileApi, uploadFileApiReducer} from "./apiRtk/uploadFile";

const rootStore = {
  global: globalSliceReducer,
  auth: authSliceReducer,
  catalog: catalogSliceReducer,
  [uploadFileApi.reducerPath]: uploadFileApi.reducer,
};
const appReducer = combineReducers({
  ...rootStore,
});
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([uploadFileApi.middleware]),
  devTools: process.env.REACT_NODE_ENV !== "production",
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
