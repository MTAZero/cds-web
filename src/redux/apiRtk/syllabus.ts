import {createApi} from "@reduxjs/toolkit/query/react";
import {API_METHOD} from "types/api-method.enum";
import {baseQuery} from "../base-query";

export const SYLLABUS_API_REDUCER_KEY = "syllabusApi";
const {POST, PUT, GET, DELETE} = API_METHOD;
export const syllabusApi = createApi({
  reducerPath: SYLLABUS_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Post"],
  endpoints: builder => ({
    getListSyllabus: builder.query<any, any>({
      query: params => ({
        url: "/huan-luyen/giao-an",
        method: GET,
        params: params,
      }),
      providesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    postSyllabus: builder.mutation<any, any>({
      query: data => ({
        url: "/huan-luyen/giao-an",
        method: POST,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    putSyllabus: builder.mutation<any, any>({
      query: data => ({
        url: `/huan-luyen/giao-an/${data?.id}`,
        method: PUT,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),

    getSyllabus: builder.query<any, any>({
      query: id => ({
        url: `/huan-luyen/giao-an/${id}`,
        method: GET,
      }),

      transformResponse: response => response?.data,
    }),
    deleteSyllabus: builder.mutation<any, any>({
      query: id => ({
        url: "/huan-luyen/giao-an",
        method: DELETE,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
  }),
});

export const syllabusApiReducer = syllabusApi.reducer;

export const {
  usePostSyllabusMutation,
  usePutSyllabusMutation,
  useGetSyllabusQuery,
  useGetListSyllabusQuery,
  useDeleteSyllabusMutation,
} = syllabusApi;
