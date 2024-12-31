import {createApi} from "@reduxjs/toolkit/query/react";
import {API_METHOD} from "types/api-method.enum";
import {baseQuery} from "../base-query";
import {serialize} from "utils";

export const USER_API_REDUCER_KEY = "userApi";
const {GET} = API_METHOD;
export const userApi = createApi({
  reducerPath: USER_API_REDUCER_KEY,
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["Post"],
  endpoints: builder => ({
    getListUser: builder.query<any, any>({
      query: params => ({
        url: `/users${serialize(params)}`,
        method: GET,
      }),
      transformResponse: response => response?.data,
    }),
  }),
});

export const userApiReducer = userApi.reducer;

export const {useGetListUserQuery} = userApi;
