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
import {unitApi} from "./apiRtk/unit";
import {planMonthApi} from "./apiRtk/planMonth";
import {planMonthDetailApi} from "./apiRtk/planMonthDetail";
import {syllabusApi} from "./apiRtk/syllabus";
import {planSyllabusApi} from "./apiRtk/planSyllabus";

const rootStore = {
  global: globalSliceReducer,
  auth: authSliceReducer,
  catalog: catalogSliceReducer,
  [uploadFileApi.reducerPath]: uploadFileApi.reducer,
  [unitApi.reducerPath]: unitApi.reducer,
  [planMonthApi.reducerPath]: planMonthApi.reducer,
  [planMonthDetailApi.reducerPath]: planMonthDetailApi.reducer,
  [syllabusApi.reducerPath]: syllabusApi.reducer,
  [planSyllabusApi.reducerPath]: planSyllabusApi.reducer,
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
    }).concat([
      uploadFileApi.middleware,
      unitApi.middleware,
      planMonthApi.middleware,
      planMonthDetailApi.middleware,
      syllabusApi.middleware,
      planSyllabusApi.middleware,
    ]),
  devTools: process.env.REACT_NODE_ENV !== "production",
});
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
