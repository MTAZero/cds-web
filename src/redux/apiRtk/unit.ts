import {createApi} from "@reduxjs/toolkit/query/react";
import {API_METHOD} from "types/api-method.enum";
import {baseQuery} from "../base-query";

export const UPLOAD_FILE_API_REDUCER_KEY = "unitApi";
const {POST, DELETE} = API_METHOD;
export const unitApi = createApi({
  reducerPath: UPLOAD_FILE_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Post"],
  endpoints: builder => ({
    postFile: builder.mutation<any, any>({
      query: data => ({
        url: "/document",
        method: POST,
        data: data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),

    deleteSensor: builder.mutation<any, any>({
      query: id => ({
        url: "",
        method: DELETE,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    getSensor: builder.query<any, any>({
      query: id => ({
        url: "",
      }),
      transformErrorResponse: (response: any) => response.error,
      transformResponse: response => response?.data,
    }),
    getListSensor: builder.query<any, any>({
      query: data => ({
        url: "",
      }),
      transformErrorResponse: (response: any) => response.error,
      providesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
  }),
});

export const unitApiReducer = unitApi.reducer;

export const {
  usePostFileMutation,
  useGetListSensorQuery,
  useDeleteSensorMutation,
  useGetSensorQuery,
} = unitApi;
