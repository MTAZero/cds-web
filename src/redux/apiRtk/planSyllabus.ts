import {createApi} from "@reduxjs/toolkit/query/react";
import {API_METHOD} from "types/api-method.enum";
import {baseQuery} from "../base-query";

export const PLAN_SYLLABUS_API_REDUCER_KEY = "planSyllabusApi";
const {POST, GET, DELETE} = API_METHOD;
export const planSyllabusApi = createApi({
  reducerPath: PLAN_SYLLABUS_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Post"],
  endpoints: builder => ({
    getListPlanSyllabus: builder.query<any, any>({
      query: data => ({
        url: "/huan-luyen/ke-hoach",
        method: GET,
        data: data,
      }),
      providesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    postPlanSyllabus: builder.mutation<any, any>({
      query: data => ({
        url: "/huan-luyen/ke-hoach",
        method: POST,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    putPlanSyllabus: builder.mutation<any, any>({
      query: data => ({
        url: `/huan-luyen/ke-hoach/${data?.id}`,
        method: POST,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),

    getPlanSyllabus: builder.query<any, any>({
      query: id => ({
        url: `/huan-luyen/ke-hoach/${id}`,
        method: GET,
      }),

      transformResponse: response => response?.data,
    }),
    deletePlanSyllabus: builder.mutation<any, any>({
      query: id => ({
        url: "/huan-luyen/ke-hoach",
        method: DELETE,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
  }),
});

export const planSyllabusApiReducer = planSyllabusApi.reducer;

export const {
  usePostPlanSyllabusMutation,
  usePutPlanSyllabusMutation,
  useGetPlanSyllabusQuery,
  useGetListPlanSyllabusQuery,
  useDeletePlanSyllabusMutation,
} = planSyllabusApi;
