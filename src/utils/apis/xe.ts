import createApiServices from "./make-api-request";

const api = createApiServices();
const getListXe = async (params = {pageIndex: 1, pageSize: 50}) => {
  const res = await api.makeAuthRequest({
    url: `/manager-vehicle`,
    method: "GET",
    params: params,
  });
  return res?.data;
};
const updateListXe = async data => {
  const res = await api.makeAuthRequest({
    url: `/manager-vehicle`,
    method: "POST",
    data: data,
  });
  return res?.data;
};

export const QuanLyXe = {
  getListXe,
  updateListXe,
};
