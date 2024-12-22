import {createApi} from "@reduxjs/toolkit/query/react";
import {API_METHOD} from "types/api-method.enum";
import {baseQuery} from "../base-query";

export const UPLOAD_FILE_API_REDUCER_KEY = "uploadFileApi";
const {POST, GET, DELETE} = API_METHOD;
export const uploadFileApi = createApi({
  reducerPath: UPLOAD_FILE_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Post"],
  endpoints: builder => ({
    getListFile: builder.query<any, any>({
      query: data => ({
        url: "/document",
        method: GET,
        data: data,
      }),
      providesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    postFile: builder.mutation<any, any>({
      query: data => ({
        url: "/document",
        method: POST,
        data: data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),

    getFile: builder.query<any, any>({
      query: id => ({
        url: "/document",
        method: GET,
      }),

      transformResponse: response => response?.data,
    }),
    deleteFile: builder.mutation<any, any>({
      query: id => ({
        url: "/document",
        method: DELETE,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
  }),
});

export const uploadFileApiReducer = uploadFileApi.reducer;

export const {
  usePostFileMutation,
  useGetFileQuery,
  useGetListFileQuery,
  useDeleteFileMutation,
} = uploadFileApi;
