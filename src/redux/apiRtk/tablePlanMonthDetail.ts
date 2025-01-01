import {createApi} from "@reduxjs/toolkit/query/react";
import {API_METHOD} from "types/api-method.enum";
import {baseQuery} from "../base-query";
import {serialize} from "utils";

export const TABLE_PLAN_MONTH_DETAIL_API_REDUCER_KEY =
  "planMonthDetailTableApi";
const {POST, GET, DELETE, PUT} = API_METHOD;
export const planMonthDetailTableApi = createApi({
  reducerPath: TABLE_PLAN_MONTH_DETAIL_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Post"],
  endpoints: builder => ({
    getListPlanMonthDetailTable: builder.query<any, any>({
      query: params => ({
        url: `/monthly-plan-detail${serialize(params)}`,
        method: GET,
      }),
      providesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    postPlanMonthDetailTable: builder.mutation<any, any>({
      query: data => ({
        url: "/monthly-plan-detail",
        method: POST,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    putPlanMonthDetailTable: builder.mutation<any, any>({
      query: data => ({
        url: `/monthly-plan-detail/${data?.id}`,
        method: PUT,
        data: data?.data,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),

    getPlanMonthDetailTable: builder.query<any, any>({
      query: id => ({
        url: `/monthly-plan-detail/${id}`,
        method: GET,
      }),

      transformResponse: response => response?.data,
    }),
    deletePlanMonthDetailTable: builder.mutation<any, any>({
      query: id => ({
        url: `/monthly-plan-detail/${id}`,
        method: DELETE,
      }),
      invalidatesTags: ["Post"],
      transformResponse: response => response?.data,
    }),
    getReport: builder.query<any, any>({
      query: id => ({
        url: `/monthly-plan-detail/of/${id}`,
        method: GET,
        responseType: "blob",
      }),
      keepUnusedDataFor: 0,

      transformResponse: response => response,
    }),
  }),
});

export const planMonthDetailTableApiReducer = planMonthDetailTableApi.reducer;

export const {
  usePostPlanMonthDetailTableMutation,
  usePutPlanMonthDetailTableMutation,
  useGetPlanMonthDetailTableQuery,
  useGetListPlanMonthDetailTableQuery,
  useDeletePlanMonthDetailTableMutation,
  useLazyGetReportQuery,
} = planMonthDetailTableApi;
