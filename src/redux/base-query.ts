import axios, {AxiosError} from "axios";
import {AppConfigs} from "const";
import {getAuthToken} from "utils/store";

const serverUrl = AppConfigs.serverUrl;
// const { BASE_URL } = ROUTER_ROUTE;

export const baseInstance = axios.create({
  baseURL: serverUrl || "",
});
export interface CustomError {
  status?: number;
  data?: any;
}

const axiosBaseQuery = (): any => async requestOpts => {
  try {
    const token = getAuthToken();
    const result = await baseInstance({
      ...requestOpts,
      headers: {
        Authorization: token ? `Bearer ${token}` : null,
      },
    });
    return {data: result.data};
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {status: err.response?.status, data: err.response?.data},
    };
  }
};

export const baseQuery = axiosBaseQuery();
