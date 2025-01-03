import {createApi} from "@reduxjs/toolkit/query/react";
import {API_METHOD} from "types/api-method.enum";
import {baseQuery} from "../base-query";

export const UNIT_API_REDUCER_KEY = "unitApi";
const {GET, POST, PUT, DELETE} = API_METHOD;
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
      providesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    getListUnit: builder.query<any, any>({
      query: params => ({
        url: `/units`,
        method: GET,
        params,
      }),
      transformResponse: response => response?.data,
    }),
    postUnit: builder.mutation<any, any>({
      query: data => ({
        url: `/units`,
        method: POST,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
    }),
    putUnit: builder.mutation<any, any>({
      query: data => ({
        url: `/units/${data?.id}`,
        method: PUT,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
    }),
    deleteUnit: builder.mutation<any, any>({
      query: id => ({
        url: `/units/${id}`,
        method: DELETE,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const unitApiReducer = unitApi.reducer;

export const {
  useGetUnitTreeQuery,
  useGetListUnitQuery,
  usePostUnitMutation,
  usePutUnitMutation,
  useDeleteUnitMutation,
} = unitApi;
