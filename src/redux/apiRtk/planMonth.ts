import {createApi} from "@reduxjs/toolkit/query/react";
import {API_METHOD} from "types/api-method.enum";
import {baseQuery} from "../base-query";

export const PLAN_MONTH_API_REDUCER_KEY = "planMonthApi";
const {POST, GET, DELETE} = API_METHOD;
export const planMonthApi = createApi({
  reducerPath: PLAN_MONTH_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Post"],
  endpoints: builder => ({
    getListPlanMonth: builder.query<any, any>({
      query: data => ({
        url: "/monthly-plan",
        method: GET,
        data: data,
      }),
      providesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    postPlanMonth: builder.mutation<any, any>({
      query: data => ({
        url: "/monthly-plan",
        method: POST,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    putPlanMonth: builder.mutation<any, any>({
      query: data => ({
        url: `/monthly-plan/${data?.id}`,
        method: POST,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),

    getPlanMonth: builder.query<any, any>({
      query: id => ({
        url: "/monthly-plan",
        method: GET,
      }),

      transformResponse: response => response?.data,
    }),
    deletePlanMonth: builder.mutation<any, any>({
      query: id => ({
        url: "/monthly-plan",
        method: DELETE,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
  }),
});

export const planMonthApiReducer = planMonthApi.reducer;

export const {
  usePostPlanMonthMutation,
  usePutPlanMonthMutation,
  useGetPlanMonthQuery,
  useGetListPlanMonthQuery,
  useDeletePlanMonthMutation,
} = planMonthApi;
