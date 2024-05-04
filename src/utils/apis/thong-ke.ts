import {ParamSearch} from "../../types";
import createApiServices from "./make-api-request";

const api = createApiServices();
const getNoiDung = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/training/content-of-month`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getKetQua = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/training/result-of-month`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const getNhatKy = async (params: any) => {
  const res = await api.makeAuthRequest({
    url: `/training/history-of-month`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
export const ThongKe = {getNoiDung, getKetQua, getNhatKy};
