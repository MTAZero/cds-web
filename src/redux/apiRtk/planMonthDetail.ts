import {createApi} from "@reduxjs/toolkit/query/react";
import {API_METHOD} from "types/api-method.enum";
import {baseQuery} from "../base-query";

export const PLAN_MONTH_DETAIL_API_REDUCER_KEY = "planMonthDetailApi";
const {POST, GET, DELETE} = API_METHOD;
export const planMonthDetailApi = createApi({
  reducerPath: PLAN_MONTH_DETAIL_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Post"],
  endpoints: builder => ({
    getListPlanMonthDetail: builder.query<any, any>({
      query: data => ({
        url: "/monthly-plan-detail",
        method: GET,
        data: data,
      }),
      providesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    postPlanMonthDetail: builder.mutation<any, any>({
      query: data => ({
        url: "/monthly-plan-detail",
        method: POST,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    putPlanMonthDetail: builder.mutation<any, any>({
      query: data => ({
        url: `/monthly-plan-detail/${data?.id}`,
        method: POST,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),

    getPlanMonthDetail: builder.query<any, any>({
      query: id => ({
        url: "/monthly-plan-detail",
        method: GET,
      }),

      transformResponse: response => response?.data,
    }),
    deletePlanMonthDetail: builder.mutation<any, any>({
      query: id => ({
        url: "/monthly-plan-detail",
        method: DELETE,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
  }),
});

export const planMonthDetailApiReducer = planMonthDetailApi.reducer;

export const {
  usePostPlanMonthDetailMutation,
  usePutPlanMonthDetailMutation,
  useGetPlanMonthDetailQuery,
  useGetListPlanMonthDetailQuery,
  useDeletePlanMonthDetailMutation,
} = planMonthDetailApi;
