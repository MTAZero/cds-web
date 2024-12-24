import {createApi} from "@reduxjs/toolkit/query/react";
import {API_METHOD} from "types/api-method.enum";
import {baseQuery} from "../base-query";

export const UNIT_API_REDUCER_KEY = "unitApi";
const {GET} = API_METHOD;
export const unitApi = createApi({
  reducerPath: UNIT_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Post"],
  endpoints: builder => ({
    getUnitTree: builder.query<any, any>({
      query: id => ({
        url: `/units/descendants/${id}`,
        method: GET,
      }),
      transformResponse: response => response?.data,
    }),
  }),
});

export const unitApiReducer = unitApi.reducer;

export const {useGetUnitTreeQuery} = unitApi;
