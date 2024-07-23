import {env} from "process";
import createApiServices from "./make-api-request";

const api = createApiServices({BaseURL: process.env.REACT_APP_URL_CTT});
console.log(api);
const getListBaiViet = async (params = null) => {
  const res = await api.makeRequest({
    url: `/api/Post/WithUser`,
    method: "GET",
    params: params,
  });
  return res;
};

export const ThongKeCtt = {
  getListBaiViet,
};
